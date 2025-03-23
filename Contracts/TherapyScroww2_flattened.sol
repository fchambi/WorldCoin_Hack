
// File: @openzeppelin/contracts/token/ERC20/IERC20.sol


// OpenZeppelin Contracts (last updated v5.0.0) (token/ERC20/IERC20.sol)

pragma solidity ^0.8.20;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);

    /**
     * @dev Returns the value of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the value of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves a `value` amount of tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 value) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets a `value` amount of tokens as the allowance of `spender` over the
     * caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 value) external returns (bool);

    /**
     * @dev Moves a `value` amount of tokens from `from` to `to` using the
     * allowance mechanism. `value` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}

// File: contracts/TherapyScroww2.sol

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TherapyEscrow {
    uint256 public counter;   
    address public owner;
    IERC20 public _token;    
    uint256 public feeTherapist;
    uint256 public feePatient;
    uint256 public feesAvailableNativeCoin;
    mapping(uint => TherapySession) public sessions;
    mapping(address => bool) whitelistedStablesAddresses;
    mapping(IERC20 => uint) public feesAvailable;

    event SessionDeposit(uint indexed sessionId, TherapySession session);
    event SessionComplete(uint indexed sessionId, TherapySession session);
    event SessionDisputed(uint indexed sessionId);
  

modifier onlyPatient(uint _sessionId) {
        require(
            msg.sender == sessions[_sessionId].patient,
            "Only Patient can call this"
        );
        _;
    }
modifier onlyTherapist(uint _sessionId) {
        require(
            msg.sender == sessions[_sessionId].therapist,
            "Only Therapist can call this"
        );
        _;
    }    

 modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }


enum SessionStatus {
        Unknown,
        Funded,
        NOT_USED,
        Completed,
        Refund,
        Arbitration
    }

struct TherapySession {
        address payable patient; 
        address payable therapist; 
        uint256 value;  // Session cost in wei
        uint256 therapistFee; 
        uint256 patientFee; 
        string sessionNotes;  // Therapist can add session notes/summary
        IERC20 currency; 
        SessionStatus status; 
    }
  constructor(address ERC20Address) {
    owner = msg.sender;
    _token = IERC20(ERC20Address);
    feeTherapist = 0;
    feePatient = 0;
    counter = 0;
  }

    function setFeeTherapist(uint256 _feeTherapist) external onlyOwner {
        require(
            _feeTherapist >= 0 && _feeTherapist <= (1 * 10000),
            "The fee can be from 0% to 1%"
        );
        feeTherapist = _feeTherapist;
    }

    function setFeePatient(uint256 _feePatient) external onlyOwner {
        require(
            _feePatient >= 0 && _feePatient <= (1 * 10000),
            "The fee can be from 0% to 1%"
        );
        feePatient = _feePatient;
    }
    
    function completeSession(uint _sessionId, string memory _sessionNotes) external onlyTherapist(_sessionId) {
        require(
            sessions[_sessionId].status == SessionStatus.Funded,
            "Session has not been paid for"
        );
         sessions[_sessionId].status = SessionStatus.Completed;
         sessions[_sessionId].sessionNotes = _sessionNotes;
    }


 function bookTherapySession(
        address payable _therapist,
        uint256 _value
    ) external payable virtual {
        uint256 _sessionId = counter + 1;
        require(msg.sender != _therapist, "Therapist cannot be the same as patient");
        require(_value == msg.value, "Incorrect amount sent");
        
        uint256 _amountFeePatient = (_value * feePatient) / 10000;
        uint256 _amountFeeTherapist = (_value * feeTherapist) / 10000;

        sessions[_sessionId] = TherapySession(
            payable(msg.sender),
            _therapist,
            _value,
            _amountFeeTherapist,
            _amountFeePatient,
            "NO NOTES",
            IERC20(address(0)),
            SessionStatus.Funded
        );

        counter++;
        emit SessionDeposit(_sessionId, sessions[_sessionId]);
    }

    function releasePayment(
        uint _sessionId
    ) external onlyPatient(_sessionId) {
        require(
            sessions[_sessionId].status == SessionStatus.Completed,
            "Session is not completed"
        );

        TherapySession storage session = sessions[_sessionId];
        uint256 therapistAmount = session.value - session.therapistFee;
        uint256 platformFees = session.therapistFee + session.patientFee;
        
        feesAvailableNativeCoin += platformFees;

        // Transfer payment to therapist
        (bool sent, ) = session.therapist.call{value: therapistAmount}("");
        require(sent, "Transfer to therapist failed");

        session.status = SessionStatus.Completed;
        emit SessionComplete(_sessionId, session);
    }

   function refundPatient(
        uint _sessionId
    ) external onlyPatient(_sessionId) {
        require(sessions[_sessionId].status == SessionStatus.Funded, "Refund not approved");
        TherapySession storage session = sessions[_sessionId];
        uint256 refundAmount = session.value;
        
        // Clear the session data before transfer to prevent reentrancy
        delete sessions[_sessionId];
        
        // Transfer the full amount back to patient
        (bool sent, ) = session.patient.call{value: refundAmount}("");
        require(sent, "Refund transfer failed");

        emit SessionDisputed(_sessionId);
    }

    // Function to withdraw platform fees
    function withdrawFees() external onlyOwner {
        uint256 amount = feesAvailableNativeCoin;
        require(amount > 0, "No fees available");
        feesAvailableNativeCoin = 0;
        
        (bool sent, ) = owner.call{value: amount}("");
        require(sent, "Fee withdrawal failed");
    }
} 
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type LevelState = {
    completedLevels : [Nat];
    lastUnlockedLevel : Nat;
  };

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let mainEventLevelStates = Map.empty<Principal, LevelState>();
  let promisesKeptLevelStates = Map.empty<Principal, LevelState>();
  let quizEventLevelStates = Map.empty<Principal, LevelState>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };

    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };

    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func saveCompletedLevel(levelNumber : Nat) : async LevelState {
    saveLevelState(mainEventLevelStates, levelNumber, caller);
  };

  public shared ({ caller }) func savePromisesKeptLevelCompleted(levelNumber : Nat) : async LevelState {
    saveLevelState(promisesKeptLevelStates, levelNumber, caller);
  };

  public shared ({ caller }) func saveQuizLevelCompleted(levelNumber : Nat) : async LevelState {
    saveLevelState(quizEventLevelStates, levelNumber, caller);
  };

  func saveLevelState(stateMap : Map.Map<Principal, LevelState>, levelNumber : Nat, caller : Principal) : LevelState {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save progress");
    };

    let currentState = switch (stateMap.get(caller)) {
      case (null) {
        { completedLevels = []; lastUnlockedLevel = 1 };
      };
      case (?state) { state };
    };

    let completedLevelsList = List.fromArray<Nat>(currentState.completedLevels);
    completedLevelsList.add(levelNumber);
    let newCompletedLevels = completedLevelsList.toArray();

    let newLastUnlockedLevel = if (levelNumber > currentState.lastUnlockedLevel) {
      levelNumber + 1;
    } else {
      currentState.lastUnlockedLevel;
    };

    let newState = {
      completedLevels = newCompletedLevels;
      lastUnlockedLevel = newLastUnlockedLevel;
    };

    stateMap.add(caller, newState);
    newState;
  };

  public query ({ caller }) func getLevelState() : async LevelState {
    getLevelStateForMap(mainEventLevelStates, caller);
  };

  public query ({ caller }) func getPromisesKeptLevelState() : async LevelState {
    getLevelStateForMap(promisesKeptLevelStates, caller);
  };

  public query ({ caller }) func getQuizLevelState() : async LevelState {
    getLevelStateForMap(quizEventLevelStates, caller);
  };

  func getLevelStateForMap(stateMap : Map.Map<Principal, LevelState>, caller : Principal) : LevelState {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get level state");
    };

    switch (stateMap.get(caller)) {
      case (null) {
        { completedLevels = []; lastUnlockedLevel = 1 };
      };
      case (?state) { state };
    };
  };

  public shared ({ caller }) func resetProgress() : async () {
    resetProgressForMap(mainEventLevelStates, caller);
  };

  public shared ({ caller }) func resetPromisesKeptProgress() : async () {
    resetProgressForMap(promisesKeptLevelStates, caller);
  };

  public shared ({ caller }) func resetQuizProgress() : async () {
    resetProgressForMap(quizEventLevelStates, caller);
  };

  func resetProgressForMap(stateMap : Map.Map<Principal, LevelState>, caller : Principal) {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can reset progress");
    };

    stateMap.add(
      caller,
      {
        completedLevels = [];
        lastUnlockedLevel = 1;
      },
    );
  };

  public query ({ caller }) func getUserLevelState(user : Principal) : async LevelState {
    getUserLevelStateForMap(mainEventLevelStates, caller, user);
  };

  public query ({ caller }) func getPromisesKeptUserLevelState(user : Principal) : async LevelState {
    getUserLevelStateForMap(promisesKeptLevelStates, caller, user);
  };

  public query ({ caller }) func getQuizUserLevelState(user : Principal) : async LevelState {
    getUserLevelStateForMap(quizEventLevelStates, caller, user);
  };

  func getUserLevelStateForMap(stateMap : Map.Map<Principal, LevelState>, caller : Principal, user : Principal) : LevelState {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view other users' level states");
    };

    switch (stateMap.get(user)) {
      case (null) {
        { completedLevels = []; lastUnlockedLevel = 1 };
      };
      case (?state) { state };
    };
  };

  public shared ({ caller }) func unlockLevel(levelNumber : Nat) : async LevelState {
    unlockLevelForMap(mainEventLevelStates, levelNumber, caller);
  };

  public shared ({ caller }) func unlockPromisesKeptLevel(levelNumber : Nat) : async LevelState {
    unlockLevelForMap(promisesKeptLevelStates, levelNumber, caller);
  };

  public shared ({ caller }) func unlockQuizLevel(levelNumber : Nat) : async LevelState {
    unlockLevelForMap(quizEventLevelStates, levelNumber, caller);
  };

  func unlockLevelForMap(stateMap : Map.Map<Principal, LevelState>, levelNumber : Nat, caller : Principal) : LevelState {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can unlock levels");
    };

    let currentState = switch (stateMap.get(caller)) {
      case (null) {
        { completedLevels = []; lastUnlockedLevel = 1 };
      };
      case (?state) { state };
    };

    let newState = {
      completedLevels = currentState.completedLevels;
      lastUnlockedLevel = levelNumber;
    };

    stateMap.add(caller, newState);
    newState;
  };
};


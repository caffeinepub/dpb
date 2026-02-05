import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
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
  let userLevelStates = Map.empty<Principal, Map.Map<Text, LevelState>>();

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

  public shared ({ caller }) func saveCompletedLevel(gameId : Text, levelNumber : Nat) : async LevelState {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save progress");
    };

    let userGames = switch (userLevelStates.get(caller)) {
      case (null) { Map.empty<Text, LevelState>() };
      case (?games) { games };
    };

    let currentState = switch (userGames.get(gameId)) {
      case (null) {
        { completedLevels = []; lastUnlockedLevel = 1 };
      };
      case (?state) { state };
    };

    let newCompletedLevels = currentState.completedLevels.concat([levelNumber]);
    let newLastUnlockedLevel = if (levelNumber > currentState.lastUnlockedLevel) {
      levelNumber + 1;
    } else {
      currentState.lastUnlockedLevel;
    };

    let newState = {
      completedLevels = newCompletedLevels;
      lastUnlockedLevel = newLastUnlockedLevel;
    };

    userGames.add(gameId, newState);
    userLevelStates.add(caller, userGames);

    newState;
  };

  public query ({ caller }) func getLevelState(gameId : Text) : async LevelState {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get level state");
    };

    switch (userLevelStates.get(caller)) {
      case (null) {
        { completedLevels = []; lastUnlockedLevel = 1 };
      };
      case (?userGames) {
        switch (userGames.get(gameId)) {
          case (null) {
            { completedLevels = []; lastUnlockedLevel = 1 };
          };
          case (?state) { state };
        };
      };
    };
  };

  public shared ({ caller }) func resetProgress(gameId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can reset progress");
    };

    let userGames = switch (userLevelStates.get(caller)) {
      case (null) { Map.empty<Text, LevelState>() };
      case (?games) { games };
    };

    userGames.add(
      gameId,
      {
        completedLevels = [];
        lastUnlockedLevel = 1;
      },
    );

    userLevelStates.add(caller, userGames);
  };

  public query ({ caller }) func getUserLevelState(user : Principal, gameId : Text) : async LevelState {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view other users' level states");
    };

    switch (userLevelStates.get(user)) {
      case (null) {
        { completedLevels = []; lastUnlockedLevel = 1 };
      };
      case (?userGames) {
        switch (userGames.get(gameId)) {
          case (null) {
            { completedLevels = []; lastUnlockedLevel = 1 };
          };
          case (?state) { state };
        };
      };
    };
  };

  public shared ({ caller }) func unlockLevel(gameId : Text, levelNumber : Nat) : async LevelState {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can unlock levels");
    };

    let userGames = switch (userLevelStates.get(caller)) {
      case (null) { Map.empty<Text, LevelState>() };
      case (?games) { games };
    };

    let currentState = switch (userGames.get(gameId)) {
      case (null) {
        { completedLevels = []; lastUnlockedLevel = 1 };
      };
      case (?state) { state };
    };

    let newState = {
      completedLevels = currentState.completedLevels;
      lastUnlockedLevel = levelNumber;
    };

    userGames.add(gameId, newState);
    userLevelStates.add(caller, userGames);

    newState;
  };
};


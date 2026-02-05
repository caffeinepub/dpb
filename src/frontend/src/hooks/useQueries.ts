import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { GAME_IDS } from '../game/constants';
import type { UserProfile } from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useGetLevelState(gameId: string = GAME_IDS.DEFAULT) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['levelState', gameId],
    queryFn: async () => {
      if (!actor) return { completedLevels: [], lastUnlockedLevel: BigInt(1) };
      return actor.getLevelState(gameId);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveCompletedLevel(gameId: string = GAME_IDS.DEFAULT) {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (levelNumber: number) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCompletedLevel(gameId, BigInt(levelNumber));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['levelState', gameId] });
    },
  });
}

export function useResetProgress(gameId: string = GAME_IDS.DEFAULT) {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.resetProgress(gameId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['levelState', gameId] });
    },
  });
}

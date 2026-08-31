export function useChallenges() {
  return useQuery({
    queryKey: ["challenges"],
    queryFn: getChallenges,
  });
}
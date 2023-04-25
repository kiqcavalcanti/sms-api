export interface UseCase<Dto, OutputDto> {
  execute(input: Dto): OutputDto | Promise<OutputDto>;
}

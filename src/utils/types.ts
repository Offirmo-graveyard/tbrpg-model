
export interface IModel<I, ICreationParams> {
	create(ICreationParams): I
	validate(I): void
}

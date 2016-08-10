
interface IError extends Error {
	params: any
	problems: string[]
	sub_error: Error
}

type IErrorReporter = (e: IError) => void

export {
IError,
IErrorReporter
}

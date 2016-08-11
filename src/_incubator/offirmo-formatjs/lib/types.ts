
interface IError extends Error {
	src: string
	params: any
	problems: string[]
	sub_error: Error
}

type IErrorReporter = (e: IError) => void

interface ICustomFormatFunction {
	(): (values: Object, intl: IIntl, libs: any, debug_id: string) => string
}

interface IIntl {
	locale: string
	messages: {
		locale?: string
		[key: string]: undefined | string | Function
	}
	formats?: Object
}


export {
	IError,
	IErrorReporter,
	IIntl,
	ICustomFormatFunction,
}

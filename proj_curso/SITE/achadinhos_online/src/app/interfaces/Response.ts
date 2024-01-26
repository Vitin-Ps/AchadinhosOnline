export interface Response<T> {
    content: T,
    pageble?: {
        pageNumber: number,
        pageSize: number
    },
    totalElements?: number,
    totalPages?: number
}
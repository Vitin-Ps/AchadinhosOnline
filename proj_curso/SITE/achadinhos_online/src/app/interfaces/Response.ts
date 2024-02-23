export interface Response<T> {
    content: T,
    pageable?: {
        pageNumber: number,
        pageSize: number
    },
    totalElements?: number,
    totalPages?: number
}
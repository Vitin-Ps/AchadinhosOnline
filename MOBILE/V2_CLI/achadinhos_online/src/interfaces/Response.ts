export interface Response<T> {
    message?: string;
    content: T;
    pageable?: {
      pageNumber: number;
      pageSize: number;
      // ... outras propriedades do pageable
    };
    totalPages?: number;
    totalElements?: number;
    // ... outras propriedades da resposta paginada
  }
  
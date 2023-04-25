import { BaseEntity } from '../../Entities/base.entity';

export interface PaginationRepositoryInterface<E extends BaseEntity> {
  items: E[] | Promise<E[]>;

  total: number;

  lastPage: number;

  firstPage: number;

  currentPage: number;

  perPage: number;
}

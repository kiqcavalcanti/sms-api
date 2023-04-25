import { SortFieldVo } from '../../ValueObjects/sort-field.vo';
import { PaginationRepositoryInterface } from './pagination.repository.interface';
import { PaginationInputVo } from '../../ValueObjects/pagination-input.vo';
import { BaseEntity } from '../../Entities/base.entity';
import { FilterableField } from '../../ValueObjects/filterable-field.vo';

export interface RepositoryInterface<Entity extends BaseEntity> {
  insert(entity: Entity): Entity | Promise<Entity>;

  findOneById(entity: string): Entity | Promise<Entity>;

  update(entity: Entity): Entity | Promise<Entity>;

  withTrash(): RepositoryInterface<Entity>;

  withoutTrash(): RepositoryInterface<Entity>;

  getFilterableFields(): FilterableField[];

  getSortableFields(): string[];

  getDefaultSort(): SortFieldVo | null;

  getAvailableIncludes(): string[];
}

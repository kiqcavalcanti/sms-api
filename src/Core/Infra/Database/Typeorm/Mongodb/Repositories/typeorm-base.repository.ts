import { PaginationRepositoryInterface } from '../../../../../Domain/Repositories/Main/pagination.repository.interface';
import { SortFieldVo } from '../../../../../Domain/ValueObjects/sort-field.vo';
import { PaginationInputVo } from '../../../../../Domain/ValueObjects/pagination-input.vo';
import {
  Not,
  MoreThan,
  MoreThanOrEqual,
  LessThan,
  LessThanOrEqual,
  In,
  IsNull,
  MongoRepository,
  Repository,
} from 'typeorm';
import { BaseModel } from '../Models/base.model';
import { BaseEntity } from '../../../../../Domain/Entities/base.entity';
import { classToPlainObject } from '../../../../Helpers/custom.helpers';
import { RepositoryInterface } from '../../../../../Domain/Repositories/Main/repository.interface';
import { RepositoryConfigurationInterface } from '../../../../../Domain/Repositories/Main/repository.configuration.interface';
import { FilterableField } from '../../../../../Domain/ValueObjects/filterable-field.vo';
import { OperatorEnum } from '../../../../../Domain/Enums/operator.enum';

export abstract class TypeormBaseRepository<
  Entity extends BaseEntity,
  Model extends BaseModel<Entity>,
> implements RepositoryInterface<Entity>
{
  protected defaultSelect = [];
  protected constructor(
    protected readonly repository: Repository<Model> | MongoRepository<Model>,
    protected readonly filters: RepositoryConfigurationInterface,
  ) {}

  // async paginate(
  //   pagination: PaginationInputVo<Entity>,
  // ): Promise<PaginationRepositoryInterface<Entity>> {
  //   const order: any = pagination.sort
  //     ? { [pagination.sort.field]: pagination.sort.sortDirection }
  //     : {};
  //
  //   const conditions = this.getConditions(pagination);
  //
  //   const [items, total] = await this.repository.findAndCount({
  //     order: order,
  //     skip: (pagination.page - 1) * pagination.perPage,
  //     take: pagination.perPage,
  //     where: conditions,
  //   });
  //
  //   const lastPage =
  //     Math.ceil(total / pagination.perPage) > 0
  //       ? Math.ceil(total / pagination.perPage)
  //       : 1;
  //
  //   const entities = [];
  //
  //   for (const item of items) {
  //     const entity = await item.toEntity();
  //     entities.push(entity);
  //   }
  //
  //   return {
  //     items: entities,
  //     total,
  //     lastPage,
  //     firstPage: 1,
  //     currentPage: pagination.page,
  //     perPage: pagination.perPage,
  //   };
  // }

  protected getConditions(pagination: PaginationInputVo<Entity>) {
    const conditions: any = {};

    for (const filter of pagination.getFilters(this.getFilterableFields())) {
      switch (filter.operator) {
        case OperatorEnum.EQ:
          conditions[filter.fieldName] = filter.value;
          break;
        case OperatorEnum.NEQ:
          conditions[filter.fieldName] = Not(filter.value);
          break;
        case OperatorEnum.GT:
          conditions[filter.fieldName] = MoreThan(filter.value);
          break;
        case OperatorEnum.GTE:
          conditions[filter.fieldName] = MoreThanOrEqual(filter.value);
          break;
        case OperatorEnum.LT:
          conditions[filter.fieldName] = LessThan(filter.value);
          break;
        case OperatorEnum.LTE:
          conditions[filter.fieldName] = LessThanOrEqual(filter.value);
          break;
        case OperatorEnum.IN:
          conditions[filter.fieldName] = In(filter.value as any[]);
          break;
        case OperatorEnum.BETWEEN:
          conditions[filter.fieldName] = {
            $gte: filter.value[0],
            $lte: filter.value[1],
          };
          break;
        case OperatorEnum.NULL:
          conditions[filter.fieldName] = IsNull();
          break;
        case OperatorEnum.NOT_NULL:
          conditions[filter.fieldName] = Not(IsNull());
          break;
        case OperatorEnum.LIKE:
          conditions[filter.fieldName] = {
            $regex: `.*${filter.value}.*`,
            $options: 'i',
          };
          break;
      }
    }
    return conditions;
  }

  async findOneById(entityId: string): Promise<Entity> {
    const options: any = { where: { id: entityId } };

    if (this.defaultSelect.length > 0) {
      options.select = this.defaultSelect;
    }

    const model: Model | null = await this.repository.findOne(options);

    return model.toEntity();
  }

  async insert(entity: Entity): Promise<Entity> {
    const entityData = classToPlainObject(entity.toJson(), false);
    const model = this.repository.create(entityData) as unknown as Model;
    await this.repository.save(model);

    entity.setPrimary(model._id.toString());

    return entity;
  }

  async update(entity: Entity): Promise<Entity> {
    const criteria: any = { id: entity.id };

    await this.repository.update(criteria, entity.toJson());

    return entity;
  }

  withTrash(): RepositoryInterface<Entity> {
    throw new Error('Method not implemented.');
  }
  withoutTrash(): RepositoryInterface<Entity> {
    throw new Error('Method not implemented.');
  }

  getAvailableIncludes(): string[] {
    return this.filters.getAvailableIncludes();
  }

  getFilterableFields(): FilterableField[] {
    return this.filters.getFilterableFields();
  }

  getSortableFields(): string[] {
    return this.filters.getSortableFields();
  }

  getDefaultSort(): SortFieldVo | null {
    return this.filters.getDefaultSort();
  }
}

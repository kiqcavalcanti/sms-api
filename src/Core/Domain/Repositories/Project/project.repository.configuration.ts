import { SortFieldVo } from '../../ValueObjects/sort-field.vo';
import { SortEnum } from '../../Enums/sort.enum';
import { RepositoryConfigurationInterface } from '../Main/repository.configuration.interface';
import { FilterableField } from '../../ValueObjects/filterable-field.vo';
import { VariableTypeEnum } from '../../Enums/variable-type.enum';

export class ProjectRepositoryConfiguration
  implements RepositoryConfigurationInterface
{
  getAvailableIncludes(): string[] {
    return [];
  }

  getDefaultSort(): SortFieldVo | null {
    return new SortFieldVo({ field: 'createdAt', direction: SortEnum.DESC });
  }

  getFilterableFields(): FilterableField[] {
    return [
      new FilterableField({ name: 'created_at', type: VariableTypeEnum.DATE }),
    ];
  }

  getFilterableByName(name: string): FilterableField {
    return this.getFilterableFields().find((f) => f.name === name);
  }

  getSortableFields(): string[] {
    return ['createdAt'];
  }
}

import { SortFieldVo } from '../../ValueObjects/sort-field.vo';
import { FilterableField } from '../../ValueObjects/filterable-field.vo';
export interface RepositoryConfigurationInterface {
  getFilterableFields(): FilterableField[];

  getFilterableByName(name: string): FilterableField;

  getSortableFields(): string[];

  getDefaultSort(): SortFieldVo | null;

  getAvailableIncludes(): string[];
}

import { RepositoryInterface } from '../Main/repository.interface';
import { BlackListGroup } from '../../Entities/black-list-group.entity';
import { BlackList } from '../../Entities/black-list.entity';

export type PaginateByBlackListItems = {
  id: string;
  name: string;
  blacklistId: string;
  phoneNumber: string;
};

export type PaginateByBlackListResult = {
  items: PaginateByBlackListItems[];
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
};

export type PaginateItems = {
  id: string;
  name: string;
  blacklistCount: number;
};

export type PaginateResult = {
  items: PaginateItems[];
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
};

export interface BlackListGroupRepositoryInterface
  extends RepositoryInterface<BlackListGroup> {
  findOneByName(name: string): BlackListGroup | Promise<BlackListGroup>;
  findById(groupIds: string[]): BlackListGroup[] | Promise<BlackListGroup[]>;
  addBlacklist(groupId: string, blacklist: BlackList);
  paginateByBlackList(
    ownerUserId?: string,
    search?: string,
    page?: number,
    perPage?: number,
  ): PaginateByBlackListResult | Promise<PaginateByBlackListResult>;

  paginate(
    ownerUserId?: string,
    search?: string,
    page?: number,
    perPage?: number,
  ): PaginateResult | Promise<PaginateResult>;
}

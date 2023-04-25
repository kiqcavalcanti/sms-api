import { MongoRepository } from 'typeorm';
import { TypeormBaseRepository } from './typeorm-base.repository';
import { BlacklistRepositoryConfiguration } from '../../../../../Domain/Repositories/Blacklist/blacklist.repository.configuration';
import {
  BlackListGroup,
  BlackListGroupAsSnakeCaseJson,
} from '../../../../../Domain/Entities/black-list-group.entity';
import { BlacklistGroupModel } from '../Models/blacklist-group.model';
import {
  BlackListGroupRepositoryInterface,
  PaginateByBlackListItems,
  PaginateByBlackListResult,
  PaginateItems,
} from '../../../../../Domain/Repositories/BlackListGroup/black-list-group.repository.interface';
import { BlacklistModel } from '../Models/blacklist.model';
import { BlackList } from '../../../../../Domain/Entities/black-list.entity';
import { classToPlainObject } from '../../../../Helpers/custom.helpers';
import { ObjectId } from 'mongodb';

export class BlacklistGroupMongoRepository
  extends TypeormBaseRepository<BlackListGroup, BlacklistGroupModel>
  implements BlackListGroupRepositoryInterface
{
  protected defaultSelect = [
    'id',
    '_id',
    'owner_user_id',
    'active',
    'updated_at',
    'created_at',
    'name',
  ];
  constructor(
    protected readonly repository: MongoRepository<BlacklistGroupModel>,
    protected readonly blackListRepository: MongoRepository<BlacklistModel>,
    protected readonly repositoryConfiguration: BlacklistRepositoryConfiguration,
  ) {
    super(repository, repositoryConfiguration);
  }

  async findOneByName(name: string): Promise<BlackListGroup> {
    const blacklistGroup = await this.repository.findOne({
      where: { name },
    });

    return blacklistGroup?.toEntity();
  }

  async findById(entityId: string[]): Promise<BlackListGroup[]> {
    const blacklistGroups = await this.repository.find({
      where: { id: { $in: entityId } },
      select: this.defaultSelect,
    });

    return Promise.all(
      blacklistGroups.map(async (item) => await item.toEntity()),
    );
  }

  async insert(entity: BlackListGroup): Promise<BlackListGroup> {
    const entityData: BlackListGroupAsSnakeCaseJson = classToPlainObject(
      entity.toJson(),
      false,
    );

    const model = this.repository.create({
      ...entityData,
      blacklists: undefined,
    });

    await this.repository.save(model);

    entity.setPrimary(model._id.toString());

    return entity;
  }

  async update(entity: BlackListGroup): Promise<BlackListGroup> {
    const blackListModel = await this.blackListRepository.find({
      where: { id: { $in: entity.blacklists.map((e) => e.id) } },
    });

    await this.repository.update(
      { id: entity.id },
      {
        ...classToPlainObject(entity.toJson(), false),
        blacklists: blackListModel,
      },
    );

    return entity;
  }

  async addBlacklist(groupId: string, blacklist: BlackList): Promise<void> {
    const blacklistModel = this.blackListRepository.create({
      _id: new ObjectId(blacklist.getPrimary()),
      ...classToPlainObject(blacklist.toJson(), false),
    });

    const update: any = { $addToSet: { blacklists: blacklistModel } };

    await this.repository.updateOne({ id: groupId }, update);
  }

  async paginateByBlackList(
    ownerUserId?: string,
    search?: string,
    page = 1,
    perPage = 10,
  ): Promise<PaginateByBlackListResult> {
    let firstMatch: any = {};

    if (ownerUserId) {
      firstMatch = { owner_user_id: ownerUserId };
    }

    const match: any = {};

    if (search) {
      match.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } },
      ];
    }

    const conditions = [
      {
        $match: firstMatch,
      },
      {
        $unwind: '$blacklists',
      },
      {
        $project: {
          _id: 0,
          id: 1,
          name: 1,
          phoneNumber: '$blacklists.phone_number',
          blacklistId: '$blacklists.id',
        },
      },
      {
        $match: match,
      },
      { $sort: { phoneNumber: 1, name: 1 } },
    ];

    const totalAsArray = (await this.repository
      .aggregate([...conditions, { $count: 'total' }])
      .toArray()) as unknown as { total: number }[];

    const total = totalAsArray[0].total;
    const skip = (page - 1) * perPage;

    const lastPage =
      Math.ceil(total / perPage) > 0 ? Math.ceil(total / perPage) : 1;

    const items = (await this.repository
      .aggregate([...conditions, { $skip: skip }, { $limit: perPage }])
      .toArray()) as unknown as PaginateByBlackListItems[];

    return {
      items,
      total,
      lastPage,
      currentPage: page,
      perPage,
    };
  }

  async paginate(
    ownerUserId?: string,
    search?: string,
    page = 1,
    perPage = 10,
  ) {
    let firstMatch: any = {};

    if (ownerUserId) {
      firstMatch = { owner_user_id: ownerUserId };
    }

    let match: any = {};

    if (search) {
      match = { name: { $regex: search, $options: 'i' } };
    }

    const conditions = [
      {
        $match: firstMatch,
      },
      {
        $project: {
          _id: 0,
          id: 1,
          name: 1,
          blacklistCount: { $size: '$blacklists' },
        },
      },
      {
        $match: match,
      },
      { $sort: { name: 1 } },
    ];

    const totalAsArray = (await this.repository
      .aggregate([...conditions, { $count: 'total' }])
      .toArray()) as unknown as { total: number }[];

    page = page ?? 1;
    perPage = perPage ?? 10;
    const total = totalAsArray[0].total;
    const skip = (page - 1) * perPage;

    const lastPage =
      Math.ceil(total / perPage) > 0 ? Math.ceil(total / perPage) : 1;

    const items = (await this.repository
      .aggregate([...conditions, { $skip: skip }, { $limit: perPage }])
      .toArray()) as unknown as PaginateItems[];

    return {
      items,
      total,
      lastPage,
      currentPage: page,
      perPage,
    };
  }
}

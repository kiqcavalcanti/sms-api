import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { CreateBlacklistGroupDto } from './dto/create-blacklist-group.dto';
import { CreateBlackListGroupUseCase } from '../../Core/Application/UseCase/Blacklist/create-black-list-group.use-case';
import { BlackListGroupResource } from '../../Core/Infra/Http/Resources/blacklist-group.resource';
import { ListBlacklistGroupUseCase } from '../../Core/Application/UseCase/Blacklist/list-blacklist-group.use-case';
import { ListBlacklistGroupResource } from '../../Core/Infra/Http/Resources/list-blacklist-group.resource';
import { ListBlacklistGroupDto } from './dto/list-blacklist-group.dto';

@Controller('/api/blacklist-groups')
@UseGuards(JwtAuthGuard)
export class BlacklistGroupController {
  constructor(
    protected readonly createUseCase: CreateBlackListGroupUseCase,
    protected readonly listUseCase: ListBlacklistGroupUseCase,
  ) {}

  @Get()
  async index(@Query() dto: ListBlacklistGroupDto, @Req() req) {
    const data = await this.listUseCase.execute({
      ...dto.toPlainObject(),
      ownerUserId: req.user.id,
    });

    return new ListBlacklistGroupResource(data.items)
      .setAdditional({
        meta: {
          total: data.total,
          current_page: data.currentPage,
          last_page: data.lastPage,
          per_page: data.perPage,
        },
      })
      .responseCollection();
  }

  @Post()
  async create(@Body() dto: CreateBlacklistGroupDto, @Req() req) {
    console.log(req.user);

    const data = await this.createUseCase.execute({
      ...dto.toPlainObject(),
      ownerUserId: req.user.id,
    });

    return new BlackListGroupResource(data).responseSingular();
  }
}

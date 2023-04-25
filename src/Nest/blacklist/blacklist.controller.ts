import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { CreateBlacklistDto } from './dto/create-blacklist.dto';
import { CreateBlacklistUseCase } from '../../Core/Application/UseCase/Blacklist/create-blacklist.use-case';
import { BlackListResource } from '../../Core/Infra/Http/Resources/blacklist.resource';
import { ListBlacklistDto } from './dto/list-blacklist.dto';
import { ListBlacklistUseCase } from '../../Core/Application/UseCase/Blacklist/list-blacklist.use-case';
import { ListBlackListResource } from '../../Core/Infra/Http/Resources/list-blacklist.resource';

@Controller('/api/blacklists')
@UseGuards(JwtAuthGuard)
export class BlacklistController {
  constructor(
    protected readonly createUseCase: CreateBlacklistUseCase,
    protected readonly listUseCase: ListBlacklistUseCase,
  ) {}

  @Get()
  async index(@Query() dto: ListBlacklistDto, @Req() req) {
    const data = await this.listUseCase.execute({
      ...dto.toPlainObject(),
      ownerUserId: req.user.id,
    });

    return new ListBlackListResource(data.items)
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
  async create(@Body() dto: CreateBlacklistDto) {
    const data = await this.createUseCase.execute(dto.toPlainObject());

    return new BlackListResource(data).responseSingular();
  }
}

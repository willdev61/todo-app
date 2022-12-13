import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todos.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  findAll() {
    return this.todoRepository.find();
  }

  async findOne(id: string) {
    const todo = await this.todoRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (!todo) {
      throw new NotFoundException(`Todo #{id} not found`);
    }
    return todo;
  }

  create(createTodoDto: CreateTodoDto) {
    const todo = this.todoRepository.create(createTodoDto);
    return this.todoRepository.save(todo);
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoRepository.preload({
      id: +id,
      ...updateTodoDto,
    });
    if (!todo) {
      throw new NotFoundException(`Todo not found`);
    }
    return this.todoRepository.save(todo);
  }

  async remove(id: string) {
    const todo = await this.findOne(id);
    return this.todoRepository.remove(todo);
  }
}

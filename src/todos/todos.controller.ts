import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {}
    
    @Get()
    findAll() {
        return this.todosService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.todosService.findOne('' + id)
    }

    @Post()
    createTodo(@Body() createTodoDto: CreateTodoDto) {
        return this.todosService.create(createTodoDto); 
    }

    @Patch(':id')
    updateTodo(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
        return this.todosService.update(id, updateTodoDto);
    }

    @Delete(':id')
    removeTodo(@Param('id') id: string) {
        return this.todosService.remove(id);
    }
}

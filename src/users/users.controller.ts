import {
    Controller,
    Get,
    Patch,
    Post,
    Delete,
    Param,
    Body,
    Query,
    Ip,
    ParseIntPipe,
    DefaultValuePipe,
  } from '@nestjs/common';
  import { CreateUserDto } from 'src/users/dto/create-user.dto'; // Import the Dto validation that we've done
  import { ValidationPipe } from '@nestjs/common';
  import { GetUserParamDto } from 'src/users/dto/get-usersParam.dto';
  import { UserService } from './providers/user.services';
  import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
  
  // http://localhost:3000/users
  
  @Controller('user')
  @ApiTags('users')
  export class UsersController {
    constructor(private readonly userService: UserService) {} // Injecting a dependency of a userService
  
    @ApiOperation({ summary: 'this fetches all users' })
    @ApiResponse({
      status: 200,
      description: 'Users fetched successfully based on the query',
    })
    @Get('/:id?')
    @ApiQuery({
      name: 'limit',
      type: 'number',
      required: false,
    })
    @ApiQuery({
      name: 'page',
      type: 'number',
      required: false,
      description: 'Number of entries per query (default: 10)',
    })
    public getUsers(
      @Param() getUserParamDto: GetUserParamDto, // Converts the strings into numbers
      @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limits: number,
      @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number, // The number of values to appear in a single page
    ) {
      return this.userService.getUser(getUserParamDto, limits); // Fetching the users
    }
  
    @Post()
    @ApiOperation({ summary: 'This makes a new post' })
    public createUser(
      @Body(new ValidationPipe()) createUserDto: CreateUserDto, // Using the validation DTO as the body type
    ) {
      return this.userService.createUser(createUserDto); // Creating a new user
    }
  
    @Patch()
    @ApiOperation({ summary: 'This updates a user' })
    public patchUser(@Ip() ip: any) {
      console.log(ip);
      return 'Request sent to update a user';
    }
  
    @Delete()
    @ApiOperation({ summary: 'This deletes a user' })
    public deleteUser() {
      return 'Request sent to delete a user';
    }
  }
import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from '../Dto/review.dto';
import { AuthenticationGuard } from '../auth/authentication.guard';  
import { Console } from 'console';
import { ApiTags } from '@nestjs/swagger';

@Controller('reviews')
@ApiTags('Reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  //@UseGuards(AuthenticationGuard)  
  @Post('create')
  async createReview( @Body() createReviewDto: CreateReviewDto,@Req() req,) {
    // const userId = req.user.sub;  
    // createReviewDto.user = userId;  
    console.log("review add")
    return this.reviewService.createReview(createReviewDto);  
   
  }
  @Get('Get_all_review')
  async getAllReviews() {
    return this.reviewService.getAllReviews();
  }

}

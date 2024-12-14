import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from '../Dto/review.dto';
import { AuthenticationGuard } from '../auth/authentication.guard';  
import { Console } from 'console';

@Controller('reviews')
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
}

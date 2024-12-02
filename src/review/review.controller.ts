import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from '../Dto/review.dto';
import { AuthenticationGuard } from '../auth/authentication.guard';  // Authentication guard to ensure user is logged in

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(AuthenticationGuard)  // Ensure the user is authenticated
  @Post('create')
  async createReview(
    @Body() createReviewDto: CreateReviewDto,
    @Req() req,
  ) {
    const userId = req.user.sub;  // Get the user ID from the JWT token
    createReviewDto.user = userId;  // Attach the user ID to the DTO

    return this.reviewService.createReview(createReviewDto);  // Call service to create the review
  }
}

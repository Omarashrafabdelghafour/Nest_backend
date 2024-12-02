import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from '../schemas/review.schema';
import { CreateReviewDto } from '../Dto/review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
  ) {}

  async createReview(createReviewDto: CreateReviewDto): Promise<Review> {
    const { user, rating, comment, product } = createReviewDto;

    // Create the review document
    const review = new this.reviewModel({
      user,
      rating,
      comment,
      product,  // Will be undefined if it's a global comment
    });

    // Save the review to the database
    return review.save();
  }
}

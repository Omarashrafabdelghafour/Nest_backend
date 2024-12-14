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

    
    const review = new this.reviewModel({
      user,
      rating,
      comment,
      product,  
    });

    
    return review.save();
  }
}

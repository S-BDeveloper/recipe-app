# Nutrition API Integration

## Overview

The Recipe App now uses the **USDA FoodData Central API** to provide real, accurate nutritional information for recipes.

## API Details

### USDA FoodData Central API

- **Provider**: United States Department of Agriculture
- **Cost**: Free (with rate limits)
- **Data Source**: Comprehensive food database with over 300,000 foods
- **Coverage**: US foods and international foods

### Features

- ✅ **Real nutritional data** from official USDA database
- ✅ **Comprehensive nutrient information** (vitamins, minerals, macronutrients)
- ✅ **Accurate ingredient analysis** based on actual food composition
- ✅ **Professional-grade data** used by nutritionists and health professionals

## How It Works

### 1. Ingredient Analysis

- Extracts ingredients from recipe data
- Searches USDA database for each ingredient
- Finds the most relevant food match

### 2. Nutrition Extraction

- Retrieves detailed nutrition data for each ingredient
- Maps USDA nutrient codes to readable names
- Aggregates nutrition information across ingredients

### 3. Data Display

- Shows comprehensive nutrition facts
- Includes vitamins, minerals, macronutrients
- Displays in user-friendly format

## Supported Nutrients

### Macronutrients

- Calories
- Protein
- Total Fat
- Carbohydrates
- Fiber
- Sugar

### Vitamins

- Vitamin A
- Vitamin C
- Vitamin D
- Vitamin E
- Vitamin K
- Vitamin B1 (Thiamin)
- Vitamin B2 (Riboflavin)
- Niacin
- Vitamin B6
- Folate
- Vitamin B12

### Minerals

- Calcium
- Iron
- Potassium
- Magnesium
- Zinc
- Copper
- Selenium
- Phosphorus
- Sodium

### Fats

- Saturated Fat
- Monounsaturated Fat
- Polyunsaturated Fat
- Cholesterol

## API Rate Limits

### Demo Key (Current)

- **Requests per day**: 1,000
- **Requests per minute**: 10
- **Suitable for**: Development and testing

### Production Key

- **Requests per day**: 3,600
- **Requests per minute**: 60
- **Cost**: Free
- **Application**: Required for production use

## Getting a Production API Key

1. Visit [USDA FoodData Central](https://fdc.nal.usda.gov/api-key-signup.html)
2. Fill out the application form
3. Receive your API key via email
4. Replace `DEMO_KEY` in `src/services/nutritionAPI.js`

## Error Handling

The API includes robust error handling:

- **Network errors**: Graceful fallback
- **Rate limiting**: Automatic retry with delays
- **Invalid data**: Skip problematic ingredients
- **Missing data**: Show available information

## Benefits

### For Users

- **Accurate nutrition information** for informed food choices
- **Comprehensive nutrient data** for dietary planning
- **Professional-grade data** from trusted source
- **Real-time analysis** based on actual ingredients

### For the App

- **Enhanced credibility** with official data source
- **Professional appearance** with comprehensive nutrition facts
- **Competitive advantage** over apps using mock data
- **User trust** through accurate information

## Future Enhancements

### Planned Features

- **Serving size calculations** based on recipe portions
- **Dietary restriction filtering** (vegetarian, gluten-free, etc.)
- **Nutritional goal tracking** integration
- **Recipe comparison** by nutrition content
- **Export nutrition data** to health apps

### Technical Improvements

- **Caching system** for frequently used ingredients
- **Batch processing** for multiple ingredients
- **Offline nutrition database** for common foods
- **Machine learning** for better ingredient matching

---

**Note**: This integration provides real nutritional data, making the app more valuable and trustworthy for users who care about their nutrition and health.

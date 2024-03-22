import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {
  minPrice = 0;
  maxPrice = 1000;
  priceRange: number[] = [0, 1000]; // Initial price range

  yourData = [ /* Your data array here */ ];

  onPriceChange() {
    // Filter your data based on the price range (this.priceRange)
    // Update your filtered data accordingly
    // Example: this.filteredData = this.yourData.filter(item => item.price >= this.priceRange[0] && item.price <= this.priceRange[1]);
  }
}

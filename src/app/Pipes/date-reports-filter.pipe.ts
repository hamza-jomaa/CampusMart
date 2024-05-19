import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateReportsFilter'
})
export class DateReportsFilterPipe implements PipeTransform {

  transform(items: any[], selectedMonth: string, selectedYear: string): { filteredItems: any[], itemCount: number } {
    if (!items || !selectedYear) {
      return { filteredItems: items, itemCount: items.length };
    }

    if (selectedMonth=="None") {
      const filteredItems = items.filter(item => {
        const itemDate = new Date(item.orderdate);
        const itemYear = itemDate.getFullYear().toString();

        return itemYear === selectedYear;
      });

      return { filteredItems, itemCount: filteredItems.length };
    }

    // Filter items based on the selected month and year
    const filteredItems = items.filter(item => {
      const itemDate = new Date(item.orderdate);
      const itemMonth = itemDate.toLocaleString('en-US', { month: 'short' });
      const itemYear = itemDate.getFullYear().toString();

      return itemMonth === selectedMonth && itemYear === selectedYear;
    });

    return { filteredItems, itemCount: filteredItems.length };
  }
}

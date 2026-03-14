import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.html',
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'default';

  get classes(): string {
    const base = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium';
    const variants: Record<BadgeVariant, string> = {
      default: 'bg-gray-100 text-gray-700',
      primary: 'bg-blue-100 text-blue-700',
      success: 'bg-green-100 text-green-700',
      warning: 'bg-yellow-100 text-yellow-700',
      danger: 'bg-red-100 text-red-700',
    };
    return `${base} ${variants[this.variant]}`;
  }
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.html',
})
export class AlertComponent {
  @Input() variant: AlertVariant = 'info';
  @Input() title = '';

  get wrapperClasses(): string {
    const variants: Record<AlertVariant, string> = {
      info: 'bg-blue-50 border-blue-200 text-blue-800',
      success: 'bg-green-50 border-green-200 text-green-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      danger: 'bg-red-50 border-red-200 text-red-800',
    };
    return `flex gap-3 rounded-lg border p-4 ${variants[this.variant]}`;
  }

  get iconClasses(): string {
    const variants: Record<AlertVariant, string> = {
      info: 'text-blue-500',
      success: 'text-green-500',
      warning: 'text-yellow-500',
      danger: 'text-red-500',
    };
    return variants[this.variant];
  }

  get icon(): string {
    const icons: Record<AlertVariant, string> = {
      info: 'ℹ',
      success: '✓',
      warning: '⚠',
      danger: '✕',
    };
    return icons[this.variant];
  }
}

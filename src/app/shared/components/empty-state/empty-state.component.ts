import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss'
})
export class EmptyStateComponent {
  @Input() eyebrow = 'Sin resultados';
  @Input() title = 'No hay información para mostrar';
  @Input() description = 'Prueba con otros filtros o regresa a la sección principal.';
  @Input() ctaLabel = '';
  @Input() ctaLink = '';
}
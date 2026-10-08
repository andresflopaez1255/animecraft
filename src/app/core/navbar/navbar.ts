import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export default class Navbar {
  protected readonly navLinks = [
    { label: 'Anime', href: '#' },
    { label: 'Géneros', href: '#' },
    { label: 'Mi lista', href: '#' },
  ] as const;
}

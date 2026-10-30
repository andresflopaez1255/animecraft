import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export default class Navbar {
  navLinks = [
    { label: 'Anime', href: '#' },
    { label: 'Géneros', href: '#' },
    { label: 'Mi lista', href: '#' },
  ];
}

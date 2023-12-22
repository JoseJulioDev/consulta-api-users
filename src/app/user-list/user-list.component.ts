import { UserService } from './user-list.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchQuery: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((response: any) => {
      this.users = response.data;
      this.filteredUsers = this.users;
    });
  }

  filterUsers(): void {
    const query = this.searchQuery.toLowerCase();

    if (query.length >= 3) {
      this.filteredUsers = this.users.filter(user =>
        user.first_name.toLowerCase().includes(query) || user.last_name.toLowerCase().includes(query)
      );
    } else {
      this.filteredUsers = this.users;
    }

  }
}

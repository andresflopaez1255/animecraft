import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LastEpisodies } from './last-episodies';

describe('LastEpisodies', () => {
  let component: LastEpisodies;
  let fixture: ComponentFixture<LastEpisodies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastEpisodies],
    }).compileComponents();

    fixture = TestBed.createComponent(LastEpisodies);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

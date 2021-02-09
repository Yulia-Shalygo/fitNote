import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AbonementService } from 'src/app/services/abonement.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { createAbonement, getShapes, getUsers } from '../../store/actions/abonement.actions';
import { Abonement } from '../../store/models/abonement.model';
import { Shape } from '../../store/models/shape.model';
import { getAbonementByUserIdSelector, getShapeByID, getShapesWithoutTrainer, getShapesWithTrainer, getSpecialShapes } from '../../store/selectors/abonement.selectors';

@Component({
  selector: 'app-create-abonement-form',
  templateUrl: './create-abonement-form.component.html',
  styleUrls: ['./create-abonement-form.component.css']
})
export class CreateAbonementFormComponent implements OnInit {

  abonementForm: FormGroup;
  userId: any;

  abonement: Abonement = {
    start_date: null,
    end_date: null,
    shape: null,
    days: null,
  };

  shapesWithoutTrainer: Shape[];
  withoutTrainer = false;
  shapesWithTrainer: Shape[];
  withTrainer = false;
  shapesSpecial: Shape[];
  special = false;

  curShape = null;

  constructor(
    private firebaseService: FirebaseService,
    private abonementService: AbonementService,
    private store: Store,
    private activationRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.abonementForm = new FormGroup({
      dateOfStart: new FormControl(null,
        Validators.required),
      dateOfEnd: new FormControl(null,
        Validators.required),
      comment: new FormControl(null),
      trainer: new FormControl(null)
    });
    
    this.activationRoute.params.subscribe(userId => this.userId = userId.id);
    this.store.select(getAbonementByUserIdSelector(this.userId)).subscribe(user => {
      if (user) {
        if (user.abonement) {
          this.abonement.start_date = user.abonement.start_date;
          this.abonement.end_date = user.abonement.end_date;
          this.abonement.comment = user.abonement.comment;
          this.curShape = user.abonement.shape;
        }
      }
    });

    this.store.dispatch(getUsers());
    this.firebaseService.getAllUsers();
    this.store.dispatch(getShapes());
    this.store.select(getShapesWithoutTrainer).subscribe(shapes => {
      this.shapesWithoutTrainer = shapes
    });
    this.store.select(getShapesWithTrainer).subscribe(shapes => this.shapesWithTrainer = shapes);
    this.store.select(getSpecialShapes).subscribe(shapes => this.shapesSpecial = shapes);
  }

  getCost(days: number): number {
    return this.abonementService.getCost(days);
  }

  async createAbonement(): Promise<void> {
    const { dateOfStart, dateOfEnd, trainer, comment } = this.abonementForm.value;

    let userId = this.userId;
    let needShape: Shape;
    let shapeId: number;
    
    this.store.select(getShapeByID(this.curShape)).subscribe(shape => {
      needShape = shape;
      if (shape) {
        shapeId = shape.id;
      }
    });

    let abonement: Abonement = {
      start_date: dateOfStart,
      end_date: dateOfEnd,
      shape: shapeId,
      trainer,
      comment,
      userId: userId,
      days: needShape.numberOfDays
    };

    this.abonementForm.disable();
    this.store.dispatch(createAbonement({ abonement }));
    this.store.dispatch(getUsers());

    // this.router.navigate(['/abonement']);
  }
  
  withoutTrainerAbon(shapeid: number): void {
    this.withoutTrainer = true;
    this.withTrainer = false;
    this.special = false;

    if(shapeid !== 0) {
      this.curShape = shapeid;
    }
  }

  withTrainerAbon(shapeid: number): void {
    this.withoutTrainer = false;
    this.withTrainer = true;
    this.special = false;

    if(shapeid !== 0) {
      this.curShape = shapeid;
    }
  }

  specialAbon(shapeid: number): void {
    this.withoutTrainer = false;
    this.withTrainer = false;
    this.special = true;

    if(shapeid !== 0) {
      this.curShape = shapeid;
    }
  }
}

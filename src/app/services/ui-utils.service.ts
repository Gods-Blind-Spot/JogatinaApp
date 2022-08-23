import { Injectable } from '@angular/core';
import { AlertController, Animation, AnimationController } from '@ionic/angular';
import { alertShakyEnterAnimation } from '../anim/enter.animation';

@Injectable({
  providedIn: 'root'
})
export class UiUtilsService {

  constructor(
    private animationCtrl: AnimationController,
    private alertController: AlertController
  ) { }

  /**
   *
   * On call, presents an alert modal to the user asking for confirmation on the action.
   *
   * @param confirmable - Whether the alert should be confirmable.
   * @param destructive - Whether the action will permanently delete anything.
   * @return A boolean representing whether the user confirmed the action;
   */
  async confirmAlert(header: string, subHeader?: string, message?: string, confirmable = true, destructive = false) {

    console.log('alertCOnfirm');

    let destructiveAnim: Animation;
    let destructiveCss;

    if (destructive) {
      destructiveAnim = this.animationCtrl.create()
        .iterations(5)
        .duration(500)
        .direction('alternate')
        .fromTo('transform', 'translateX(0px)', 'translateX(2px)');
    }

    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      enterAnimation: (baseEl) => alertShakyEnterAnimation(baseEl, this.animationCtrl),
      cssClass: 'confirm-alert',
      buttons: [
        {
          text: 'Confirmar',
          handler: () => true,
          cssClass: [destructiveCss],
        },
        {
          text: 'Cancelar',
          handler: () => false,
          cssClass: [''],
        },
      ]
    });

    await alert.present();

    const data = await alert.onDidDismiss();
    return data;
  }
}

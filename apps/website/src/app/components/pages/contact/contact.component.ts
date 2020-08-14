import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import "firebase/auth";
import "firebase/firestore";
import { GoogleAnalyticsService } from "../../../services/google-analytics.service";
import { ContactData } from "../../../services/email.service";
import { EmailService } from "../../../services/email.service";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  validated: boolean = false;
  isSent: boolean = false;
  isLoading: boolean = false;
  loadingText: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private googleAnalyticsService: GoogleAnalyticsService,
    private emailService: EmailService
  ) {
    this.contactForm = this.formBuilder.group({
      name: [
        "",
        Validators.compose([Validators.minLength(3), Validators.required]),
      ],
      email: ["", Validators.compose([Validators.email, Validators.required])],
      message: [
        "",
        Validators.compose([Validators.minLength(10), Validators.required]),
      ],
    });
  }

  ngOnInit() {}

  onSubmit(contactData): void {
    this.validated = true;

    if (!this.contactForm.valid) return;

    this.sendEmail(contactData.name, contactData.email, contactData.message);
    this.startLoading();
  }

  startLoading(): void {
    this.isSent = true;
    this.isLoading = true;
    this.googleAnalyticsService.eventEmitter(
      "generate_lead",
      "Forms",
      "Submit",
      "Contact Form"
    );
    this.googleAnalyticsService.trackConversion();
    this.updateLoadingText();
    setTimeout(() => this.completeLoading(), 2000);
  }

  updateLoadingText(): void {
    if (!this.isLoading) return;
    this.loadingText == "..."
      ? (this.loadingText = "")
      : (this.loadingText = this.loadingText += ".");
    setTimeout(() => this.updateLoadingText(), 300);
  }

  completeLoading(): void {
    this.isLoading = false;
  }

  sendEmail(name: string, email: string, message: string): void {
    let contactData: ContactData = {
      name: name,
      email: email,
      message: message,
    };

    this.emailService
      .contactEmail(contactData)
      .subscribe((response) => console.log(response));
  }
}
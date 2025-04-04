# NehanDev Portfolio

A professional web development portfolio website built with Next.js, React, Tailwind CSS, and Framer Motion.

## Features

- Responsive design for all devices
- Dark/light mode support
- Animated components with Framer Motion
- Project showcase
- Contact form with email integration
- Elegant monochrome color scheme

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/nehandev/portfolio.git
cd portfolio
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables
   Create a `.env.local` file in the root directory with the following variables:

```
EMAIL_USER=your.email@gmail.com
EMAIL_APP_PASSWORD=your-app-password-here
```

### Setting up Gmail App Password

To use the contact form with Gmail:

1. Go to your [Google Account](https://myaccount.google.com/)
2. Enable 2-Step Verification if not already enabled
3. Go to [App passwords](https://myaccount.google.com/apppasswords)
4. Select "Mail" as the app and "Other" as the device (name it "NextJS App")
5. Copy the generated app password
6. Paste it in your `.env.local` file as `EMAIL_APP_PASSWORD`

### Running the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contact Form Integration

The contact form sends emails using Nodemailer and Next.js API routes. When a user submits the form:

1. Client-side validation checks required fields
2. The form data is sent to the `/api/contact` endpoint
3. Nodemailer sends an email to your Gmail address
4. The user receives a success message

To customize the email template, edit the HTML in `/app/api/contact/route.ts`.

## Customization

### Changing Colors

The site uses an elegant monochrome color scheme. To modify the colors:

1. Edit the `tailwind.config.js` file to update primary and secondary colors
2. Update the CSS variables in `app/globals.css`

### Adding Projects

To add new projects, edit the `projects` array in `components/ui/projects-section.tsx`.

## License

This project is licensed under the MIT License.

"use client";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";

export function TermsOfUseModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="lg"
        title="Terms of Use"
        centered
        overlayProps={{
          backgroundOpacity: 0.65,
          blur: 3,
        }}
      >
        <div className="mx-auto px-4 py-2">
          <h1 className="mb-3 font-clash text-3xl font-semibold sm:text-4xl">
            Terms of Use
          </h1>
          <p className="mb-4 font-geist">
            Welcome to Tasty Tracks, an online food ordering system. By
            accessing or using our website, you agree to comply with and be
            bound by the following terms and conditions:
          </p>

          <h2 className="mb-2 mt-3 text-xl font-bold sm:text-2xl">
            1. Use of Website
          </h2>
          <p className="mb-3 font-geist">
            You agree to use our website for lawful purposes and in a way that
            does not infringe the rights of others.
          </p>

          <h2 className="mb-2 mt-3 text-xl font-bold sm:text-2xl">
            2. Account Registration
          </h2>
          <p className="mb-3 font-geist">
            In order to access certain features of our website, you may be
            required to register for an account. You are responsible for
            maintaining the confidentiality of your account credentials.
          </p>

          <h2 className="mb-2 mt-3 text-xl font-bold sm:text-2xl">
            3. Ordering and Payment
          </h2>
          <p className="mb-3 font-geist">
            By placing an order through our website, you agree to pay all
            charges incurred. Payments are processed securely, and we do not
            store your payment information.
          </p>

          <h2 className="mb-2 mt-3 text-xl font-bold sm:text-2xl">
            4. Intellectual Property
          </h2>
          <p className="mb-3 font-geist">
            All content and materials available on our website are protected by
            intellectual property rights. You may not use, modify, reproduce, or
            distribute any content without our prior written consent.
          </p>

          <h2 className="mb-2 mt-3 text-xl font-bold sm:text-2xl">
            5. Disclaimer
          </h2>
          <p className="mb-3 font-geist">
            Our website is provided on an &ldquo;as is&rdquo; and &ldquo;as
            available&rdquo; basis. We make no warranties or representations of
            any kind, express or implied, regarding the accuracy, reliability,
            or availability of our website.
          </p>

          <h2 className="mb-2 mt-3 text-xl font-bold sm:text-2xl">
            6. Limitation of Liability
          </h2>
          <p className="mb-3 font-geist">
            We shall not be liable for any direct, indirect, incidental,
            special, or consequential damages arising out of or in any way
            connected with your use of our website.
          </p>

          <h2 className="mb-2 mt-3 text-xl font-bold sm:text-2xl">
            7. Changes to Terms
          </h2>
          <p className="mb-3 font-geist">
            We reserve the right to modify or update these terms of use at any
            time. It is your responsibility to review these terms periodically
            for changes.
          </p>

          <p className="mt-8">
            If you have any questions or concerns about these terms of use,
            please contact us.
          </p>
        </div>
      </Modal>
      <button
        type="button"
        onClick={open}
        className="cursor-pointer font-medium text-orange-600 decoration-2 hover:underline"
      >
        Terms of use
      </button>{" "}
    </>
  );
}

export function PrivacyPolicyModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="lg"
        title="Privacy Policy"
        centered
        overlayProps={{
          backgroundOpacity: 0.65,
          blur: 3,
        }}
      >
        <div className="mx-auto px-4 py-2">
          <h1 className="mb-4 font-clash text-3xl font-semibold sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mb-4">
            Welcome to Tasty Tracks, an online food ordering system. This
            Privacy Policy explains how we collect, use, and disclose
            information about you when you use our website. By accessing or
            using our website, you agree to this Privacy Policy.
          </p>

          <h2 className="mb-2 mt-6 text-xl font-bold sm:text-2xl">
            1. Information We Collect
          </h2>
          <p className="mb-4 font-geist">
            We collect information you provide directly to us, such as your
            name, email address, and phone number when you register for an
            account or place an order. We also collect information automatically
            when you use our website, such as your IP address, browser type, and
            device information.
          </p>

          <h2 className="mb-2 mt-6 text-xl font-bold sm:text-2xl">
            2. How We Use Your Information
          </h2>
          <p className="mb-4 font-geist">
            We use the information we collect to provide, maintain, and improve
            our services, communicate with you, and personalize your experience.
            We may also use your information to comply with legal obligations or
            protect our rights.
          </p>

          <h2 className="mb-2 mt-6 text-xl font-bold sm:text-2xl">
            3. Information Sharing
          </h2>
          <p className="mb-4 font-geist">
            We may share your information with third-party service providers or
            business partners who assist us in providing our services. We may
            also share your information in response to legal requests or to
            protect our rights.
          </p>

          <h2 className="mb-2 mt-6 text-xl font-bold sm:text-2xl">
            4. Security
          </h2>
          <p className="mb-4 font-geist">
            We take reasonable measures to protect your information from
            unauthorized access, disclosure, or alteration. However, no method
            of transmission over the Internet or electronic storage is 100%
            secure, so we cannot guarantee absolute security.
          </p>

          <h2 className="mb-2 mt-6 text-xl font-bold sm:text-2xl">
            5. Changes to This Policy
          </h2>
          <p className="mb-4 font-geist">
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
            You are advised to review this Privacy Policy periodically for any
            changes.
          </p>

          <p className="mt-8">
            If you have any questions or concerns about this Privacy Policy,
            please contact us.
          </p>
        </div>
      </Modal>
      <button
        type="button"
        onClick={open}
        className="cursor-pointer font-medium text-orange-600 decoration-2 hover:underline"
      >
        Privacy Policy
      </button>{" "}
    </>
  );
}

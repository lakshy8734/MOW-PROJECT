import img from '../../assets/mow.webp'
import style from './TermsOfUse.module.css'
import React, { useState, useEffect } from 'react';
import Link from 'Component/Link/Link';
import LoginPop from 'Component/LoginPop/LoginPop';
import Navbar from 'Component/Navbar/Navbar';




import {
    FaYoutube,
    FaInstagram,
    FaPinterest,
    FaFacebook,
} from "react-icons/fa";

import Aos from "aos";
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';
import Shareit from 'Component/Shareit/Shareit';


function TermsOfUse() {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/");
    };


    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])


    return (
        <div>

            <div style={{ position: "sticky", top: "0", zIndex: "1" }}>
                <Navbar />
            </div>
            <section className={style.About}>

                <p data-aos="fade-up">
                    Please read these Terms of Use (the <strong>“Terms“</strong>) carefully before using the websites located at <span style={{ color: '#d33', cursor: 'pointer', }} onClick={() => { navigate('/') }}>myotakuworld.com</span> and all subdomains related to each site (each site and related subdomains, a “<strong>Website</strong>” and collectively, the <strong>“Websites“</strong>), any software applications branded by My Otaku World. (hereinafter <strong>“MOW,</strong>” <strong>“we,” “us,” “our“</strong>), or any software applications (<strong>“Applications“</strong>) or services provided by us through any third party websites, such as Facebook (each a <strong>“Third Party Site”</strong> and, collectively, <strong>“Third Party Sites“</strong>).
                </p>
                <p data-aos="fade-up">
                    The Websites, and any applications, products or services provided by us, either directly or through any Third Party Sites, are collectively, the <strong>“Services.“</strong>
                </p>

                <p data-aos="fade-up" className={style.special}>
                    THESE TERMS CREATE A BINDING LEGAL CONTRACT BETWEEN YOU AND MOW. BY USING THE SERVICES, YOU REPRESENT AND WARRANT THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS. IF YOU DO NOT ACCEPT THESE TERMS, YOU MUST NOT USE – AND ARE NOT AUTHORIZED TO USE – ALL OR ANY PORTION OF THE SERVICES.
                </p>

                <h2>GENERAL</h2>


                <ul data-aos="fade-up">
                    <div>
                        <li>
                            The Services are offered by MOW to enable you to see, experience, and learn more about Japanese otaku culture, such as animation (anime), comics (manga), illustration, cosplay, etc., and to engage with other fans of such culture. Certain portions of the Websites also will provide you with a platform to participate in crowd-sourced projects for the development of certain products as more fully described in Section 10. Through the Services you will be exposed to a wide range of information, including, possibly, photographs, communications, music, videos, artwork, messages, and merchandise (collectively, <strong>“Content“</strong>). Some of the Content may be provided by us while other Content may be provided by other users of the Services or third party merchandisers (each a “User” and, collectively, “Users“). Content provided by Users, including any public postings or communications with other Users of the Services (including, without limitation, any Project Feedback (defined below) and any General Feedback (defined below), is, collectively, <strong>“User Content.“</strong>
                        </li>
                        <li>
                            Use by or on Behalf of an Entity. If you are using the Services on behalf of a company, entity or organization (each a <strong>“Subscribing Entity“</strong>), then you represent and warrant that you: (a) are an authorized representative of that Subscribing Entity with the authority to bind such entity to these Terms and (b) agree to be bound by these Terms on behalf of such Subscribing Entity.
                        </li>
                        <li>
                            Changes to these Terms. The Websites and all Services (but not the Third Party Sites) are owned and operated by MOW. MOW reserves the right to revise these Terms in its sole discretion at any time and without prior notice to you other than by posting the revised Terms on the Websites. Any revisions to the Terms are effective upon posting. The Terms will be identified as of the most recent date of revision. It is incumbent upon you to visit this page periodically to ensure your continued acceptance of these Terms. Your continued use of the Services after a revised version of these Terms has been posted by MOW to the Websites constitutes your binding acceptance of such revision and the revised Terms. Notwithstanding the preceding sentences of this Section 1.3, no revisions to these Terms will apply to any dispute between you and MOW that arose prior to the date of such revision.
                        </li>
                        <li>
                            Evolving Nature of Services. The Services are continually under development and changes to the Services may be made at any time. If you disagree with the Terms or are in any way dissatisfied with the Service, we hope you will let us know by sending an e-mail to admin@myotakuworld.com, but your sole remedy is to discontinue your use of the Services.
                        </li>
                        <li>
                            Consideration. You understand and agree that these Terms are entered into in consideration of your use of the Services and other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged.
                        </li>
                    </div>
                </ul>

                <h2 data-aos="fade-up">
                    USE OF THE SERVICE
                </h2>

                <p data-aos="fade-up">
                    MOW may provide the Services through the Websites, Applications, Third Party Sites, other channels owned or operated by or on behalf of MOW, and any other media or channels now known or hereafter developed, including, but not limited to, in conjunction with other products or services offered by third parties.
                </p>
                <p data-aos="fade-up">
                    The Services may require that you agree to additional terms and conditions, including those of Third Party Sites.
                </p>
                <p data-aos="fade-up">
                    Any terms and conditions required by MOW for use of any portion of the Services offered by MOW (but not those of any Third Party Site) will, unless otherwise expressly stated in such terms, supersede these Terms in the event of a conflict only as to the services with respect to which those terms relate.
                </p>

                <p data-aos="fade-up">
                    Such additional terms and conditions (if any), but not those of any Third Party Sites, are hereby incorporated into and made a part of these Terms by reference.
                </p>

                <p data-aos="fade-up">
                    You may also be subject to the terms of use of any Third Party Sites and you are solely responsible for your acceptance of and compliance with such terms. For the avoidance of doubt, these Terms apply to any of our Applications.
                </p>

                <h3 style={{ fontWeight: '600' }}>CHILDREN</h3>

                <p data-aos="fade-up">
                    We collect Personal Information when you:
                </p>

                <p data-aos="fade-up">
                    The Service is not intended for children under the age of 13. <strong> IF YOU ARE UNDER 13 YEARS OF AGE, YOU MUST NOT USE OR ACCESS THE SERVICES AT ANY TIME OR IN ANY MANNER.</strong>
                </p>

                <p data-aos="fade-up">
                    By using the Services, you affirm that you are at least 18 years of age. If you are 13 to 17 years of age, then you must obtain your parent or guardian’s consent to use the Services and by using the Services you hereby represent that you have obtained such consent. MOW does not seek to gather personal information from or about children under the age of 13 through the Services.
                </p>

                <h2>
                    PRIVACY
                </h2>

                <p data-aos="fade-up">
                    Use of the Services is governed by MOW’s Privacy Policy, which policy is hereby incorporated into these Terms by reference. Please be sure to review our Privacy Policy  before using the Services.
                </p>

                <h2>
                    SERVICE SECURITY
                </h2>

                <p data-aos="fade-up">
                    We have gone to great lengths to develop the Services and may, from time to time, take steps to protect the integrity or operation of the Services.
                </p>

                <p data-aos="fade-up">
                    If you violate these Terms in any way, as determined in our sole discretion, we may terminate your right to use the Services without any liability to you.
                </p>

                <p data-aos="fade-up">
                    We reserve the right to investigate any alleged or suspected violations of these Terms and, if a criminal violation is suspected or harm to the Services or any other Users or person, property or thing is expected, anticipated or feared, then MOW may refer such suspected violations or activities to law enforcement agencies and cooperate fully with such investigations, including, but not limited to, the disclosure of any or all of your activities on or related to the Services.
                </p>

                <p data-aos="fade-up">
                    You hereby consent in advance to such disclosures and agree that you will not have any claims against MOW arising out of such disclosures to law enforcement agencies.
                </p>

                <h2>
                    REGISTRATION
                </h2>

                <p data-aos="fade-up">
                    Log In Credentials. In order to use certain functionalities of the Services (such as to purchase Products from the MOW Shop, as defined below, or make a Pledge, as defined below), you will have to register with us in order to create an account or we may permit you to use the credentials of Third Party Sites, such as Facebook or Twitter.
                </p>
                <p data-aos="fade-up">
                    You are responsible for maintaining the confidentiality of your account credentials in order to use the Services, and are fully responsible for all activities that occur through the use of your credentials, including any purchases made through the MOW Shop.
                </p>
                <p data-aos="fade-up">
                    You agree to notify MOW immediately of any unauthorized use of your account credentials or any other breach of security with respect to your account.
                </p>

                <p data-aos="fade-up">
                    MOW will not be liable for any loss or damage arising from unauthorized use of your credentials prior to you notifying MOW of such unauthorized use or loss of your credentials.
                </p>

                <p data-aos="fade-up">
                    Separate credentials may be required in order to use Third Party Sites, and you may be subject to additional requirements, terms of use and privacy policies when using such Third Party Sites.
                </p>

                <p data-aos="fade-up">
                    If you choose to access the Services through the use of credentials of a Third Party Site, you acknowledge and agree that public information about you that is made available through such Third Party Site will be shared with us, and we have your permission to access and use such information in the operation of the Services.
                </p>

                <p data-aos="fade-up">
                    If you do not wish to share information about yourself with us that is available through Third Party Sites, then you should not use the credentials of a Third Party Site to register for and use the Services.
                </p>

                <p data-aos="fade-up">
                    Accuracy of Information. You agree to provide true, accurate, current, and complete information about yourself as requested in any registration forms required by MOW.
                </p>

                <p data-aos="fade-up">
                    You also agree to update the information about yourself promptly, and as necessary, to keep it current and accurate. If messages sent to an email address provided by you are returned as undeliverable, then MOW reserves the right to terminate your account immediately with or without notice to you and without any liability to you or any third party.
                </p>

                <h2>LICENSES</h2>


                <ul data-aos="fade-up">
                    <div>
                        <li>
                            License to the Services. We grant you a limited, revocable, non-assignable, non-sublicensable, royalty free license to access and use the Services solely in accordance with the Terms and pursuant to any authorized functionalities of the Services, including the right to access and view content made available through the Services. Except as expressly provided for in these Terms, there are no implied licenses for the use of the Services or for any Content made available on or through the Services, and the license granted herein is for your personal, non-commercial use only. No commercial uses of the Services are hereby authorized without our separate written consent, which may be withheld for any reason.
                        </li>
                        <li>
                            The Content made available on or through the Services (excluding User Content), may be protected by copyright or other intellectual property rights and owned by MOW or third party licensors of MOW. No material from the Services may be copied, reproduced, republished, uploaded, posted, transmitted, or distributed in any way without written permission of the copyright owner. Modification of materials obtained from the Services, including, but not limited to, User Content and Products, for any other purpose, including, without limitation, any commercial purpose, is a violation of the copyrights and other proprietary rights of MOW or its licencors, unless you have obtained express written authorization to the contrary. All design rights, databases and compilation and other intellectual property rights, in each case whether registered or unregistered, and related goodwill are proprietary to MOW.
                        </li>
                        <li>
                            Trademarks. All trademarks, service marks, logos and trade names on the Services, whether registered or unregistered, are proprietary to MOW or to other companies where so indicated. Unless otherwise permitted by law, you may not reproduce, download or otherwise use any such trademarks, service marks, logos or trade names without the prior written consent of the appropriate owner thereof.
                        </li>
                        <li>
                            User Content. This section governs any User Content you upload or transmit to or through the Services:
                            <ul className={style.sub} data-aos="fade-up">

                                <li>
                                    General. You are solely responsible for all User Content you submit to or through the Services. You must not upload or transmit any User Content to or through the Services or to us through email that you consider to be confidential or proprietary or the rights to which have not been cleared by you. Any User Content uploaded, linked to, or transmitted to or through the Services or to us via email will be considered non-confidential and non-proprietary, and treated as such by us, and may be used by MOW any purpose or disclosed by us to any third party with or without notice to you and without any liability by us.
                                </li>

                                <li>
                                    Retention of Your Intellectual Property Rights. BY UPLOADING, LINKING TO OR OTHERWISE PROVIDING USER CONTENT TO THE SERVICES YOU ARE NOT – PURSUANT TO THESE TERMS – SURRENDERING ANY INTELLECTUAL PROPERTY RIGHTS IN YOUR USER CONTENT THAT YOU MAY HAVE. RATHER, YOU ARE MERELY GRANTING MOW (AND OTHER USERS AS DESCRIBED IN SECTION 7(4)(c)(ii) BELOW) A LICENSE PURSUANT TO THE PROVISIONS OF THESE TERMS. YOU WILL CONTINUE TO OWN, TO THE EXTENT OF YOUR EXISTING RIGHTS, ALL OF YOUR USER CONTENT.
                                </li>

                                <li>
                                    License Grants
                                    <ul>
                                        <li>
                                            You hereby grant MOW an unrestricted, assignable, sublicensable, revocable, royalty-free license throughout the universe to reproduce, distribute, publicly display, communicate to the public, publicly perform (including by means of digital audio transmissions and on a through-to-the-audience basis), create derivative works from, modify (e.g., reformat), transmit to Third Party Sites, and otherwise use and exploit (collectively, “Use“) all User Content you link to or upload to or through the Services or to us through email, on and through the Services (including when the Services are made available through Third Party Sites), regardless of how such Services are delivered to Users, including through any technologies or distribution methods now known or hereafter created, and to advertise, market, and promote the Services and/or the availability of your User Content on the Services. You further grant MOW an irrevocable, perpetual, royalty-free license to Use your name, image, voice, likeness, and any information provided by any Third Party Sites whose credentials you use to access the Services in conjunction with advertising, marketing, or promoting the Services or the availability of your User Content. For clarity, the foregoing license does not extend to (A) General Feedback, and MOW’s license to such General Feedback is set forth in Section 7(4)(j); and (B) Project Feedback, and MOW’s license to such Project Feedback is set forth in Section 7(c)(ii).
                                        </li>

                                        <li>
                                            Without limiting anything else in these Terms, if you send to any Project Owner (defined below) private messages about any of the Project Owner’s Projects and/or post comments on the Services about Projects that will be publicly view able by other Users, then, in each case, you hereby grant the applicable recipient(s) a non-exclusive, perpetual (for the duration of any copyrights), irrevocable, transferable, sublicenseable, worldwide and royalty-free license to use, reproduce, create derivative works of, publicly display and perform, distribute, adapt, modify, combine with other materials or content and otherwise use and exploit your Project Feedback.
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    Survival of Rights for Removed User Content. You may delete your User Content from your account on the Services at any time but the rights granted in Section 7.4(c) shall survive the deletion of your User Content to the extent your User Content is stored on computer servers or other storage media or technologies utilized by MOW. (or, in the case of Project Feedback, such Content has been incorporated into any other work by any User). We may also retain any of your User Content for archival or audit purposes or pursuant to any judicial or administrative order. Any User Content you post in a public section of the Services (e.g., a comments section) may remain on the Services indefinitely and we have no obligation to remove such User Content.
                                </li>
                                <li>
                                    Limitations on Grant of Rights to MOW. Notwithstanding the grant of rights in Section 7.4(c), nothing contained in these Terms grants MOW a right or license to sell your User Content on a standalone basis to any third party, although you acknowledge and agree that MOW may generate advertising, subscription, and other revenues from the operation of the Services, including advertising that may appear before, after or simultaneously with the Use of your User Content, and that you will have no right to share in any portion of such revenue.
                                </li>
                                <li>
                                    Waiver of Rights. By uploading User Content to or through the Services you waive any rights to prior inspection or approval of any marketing or promotional materials related to such User Content. You further waive any and all rights of privacy, publicity, or any other rights of a similar nature in connection with your User Content, or any portion thereof, including, without limitation, your name, likeness, voice, image, and persona or any advertising or publicity relating thereto. To the extent any moral rights are not transferable or assignable, you hereby waive and agree never to assert any and all moral rights, or to support, maintain or permit any action based on any moral rights that you may have in or with respect to any User Content you upload to or through the Services. You expressly release MOW and all of MOW’s agents, partners, subsidiaries, affiliates, licensees, successors, and assigns from any and all claims, demands, liabilities, or causes of action, whether now known or unknown, for defamation, copyright infringement, violation of moral rights, and invasion of the rights to privacy, publicity, or personality or any similar matter, or based upon or relating to the Use of your User Content. Notwithstanding the preceding sentences of this Section 7.4(f), you should let us know immediately if you object to any uses of your User Content on or through the Services or in the promotion of the Services. We will consider all reasonable requests to terminate any Use that you find objectionable, but we shall have no liability to you for any Use authorized in these Terms.
                                </li>

                                <li>Requirement that You Be an Owner of or Fully Authorized to Grant the Rights To User Content. If you are not the owner of or are not fully authorized to grant rights in all of the intellectual property in all of the elements of the User Content you intend to upload or transmit to or through the Services, then you must not upload the User Content to or through the Services.</li>

                                <li>Confirmation of Rights. MOW reserves the right to demand confirmation from you in writing of all authorizations, licenses, permissions, and consents obtained by you (if any) with respect to any third-party materials embodied in User Content you upload to or transmit through the Services. If you fail to provide us with such confirmation upon request, then we reserve the right to remove or deny access to any or all of your User Content available on or through the Services and to suspend or terminate your account with MOW. We will have no liability to you for any actions taken by us pursuant to this Section 7.4(h).</li>

                                <li>Representations and Warranties with Respect to Your User Content. By uploading or transmitting User Content to or through the Services, you hereby represent and warrant to MOW that (i) you have obtained all necessary rights, permissions, authorizations, licenses, and clearances to grant the licenses and rights set forth in these Terms with respect to such User Content and (ii) the Use of such User Content in a manner consistent with these Terms will not (A) infringe the rights of any third party, including copyright, trademark, patent and other intellectual property rights or other protected rights, such as the rights of privacy or publicity, or (B) require MOW or any Third Party Site on or through which the Services is made available to pay any fees of any kind to any third party for any Use of your User Content.</li>

                                <li>General Feedback. You further grant MOW a royalty-free license throughout the universe to Use, without any payment or accounting to you or any other third party, any concepts, know-how, ideas or inventions that you (and those who act on your behalf) upload or transmit to or through the Services or to us through email (but excluding any Project Feedback) (collectively, “General Feedback“).</li>

                            </ul>
                        </li>


                    </div>
                </ul>


                <h2>MONITORING AND REMOVING USER CONTENT; RELIANCE ON USER CONTENT</h2>

                <ul>
                    <li>Monitoring User Content. We do not control User Content accessible on or through the Services, and do not have any obligation to monitor User Content for any purpose. We also have no obligation to permit User Content to be made available on or through the Services. We may choose, in our sole discretion, to monitor, review, or otherwise access some or all User Content, but by doing so we nonetheless assume no responsibility for the User Content, no obligation to modify or remove any inappropriate User Content, or to monitor, review, or otherwise access other User Content. You acknowledge that we may remove any of your User Content from the Services at any time, with or without notice to you and without any liability to you, including for, by way of example and not limitation, any Objectionable Content (defined below).</li>

                    <li>Reliance on Accuracy of User Content. You agree that you will evaluate and bear all risks associated with any User Content you obtain on or through the Services, including any reliance on the accuracy, completeness, usefulness or legality thereof. MOW makes no representations or warranties with respect to any User Content.</li>

                    <li>Reporting of Content. If you locate any User Content on or through the Services that you find offensive or objectionable, you may report such User to MOW by sending an e-mail to admin@myotakuworld.com. If you believe any User Content infringes any of your intellectual property rights, then please report such User Content pursuant to Section 18 of these Terms.</li>

                    <li>No Endorsement. MOW does not endorse, support, represent or guarantee the truthfulness, accuracy, or reliability of any User Content. The opinions expressed in any User Content are to be attributed solely to the author thereof. Any reliance you place on any User Content is at your own risk.</li>
                </ul>


                <h2>
                    MOW SHOP
                </h2>

                <ul data-aos="fade-up">
                    <li>
                        Products Sold by MOW
                        <ul className={style.sub} data-aos="fade-up">
                            <li>
                                MOW may offer products, including physical and digital goods, contents (the <strong>“Products“</strong>) for sale through certain portions of the Websites (the <strong> “MOW Shop“</strong>) and through  <strong>“Subscription Plans” </strong>(described in Section 9.6 below). The price for each Product shall be displayed at the point of purchase. You shall be responsible for the payment of any Product purchased by you through Mow Shop or Subscription Service (each such purchase, a <strong>“Transaction“</strong>), as well as any shipping costs, taxes or other fees associated with your Transactions.
                            </li>

                        </ul>
                    </li>
                    <li>
                        Payment.
                        <ul className={style.sub} data-aos="fade-up">
                            <li>
                                Currency. All charges and payments for Transactions will be made in U.S. currency unless otherwise specified. Currency exchange settlements and foreign transaction fees are based on your agreement with your credit card, debit card or other payment method provider.
                            </li>
                            <li>
                                Methods of Payment. Your Transactions can only be made using an approved payment method. You must be authorized to use the payment method used to make purchases through the Services. All Transactions made through the Services will be confirmed by an e-mail sent to the e-mail address affiliated with your User account. If you have any questions regarding any purchase confirmation you receive, then please direct your questions to admin@myotakuworld.com .
                            </li>
                            <li>
                                Prices. Published prices do not include taxes, duties or shipping and may be changed without notice at any time. You agree to indemnify and hold MOW harmless from any claims by any taxing authority arising out of your Transactions through the Services.
                            </li>
                            <li>
                                Refunds. All Transactions are final, and MOW does not offer refunds for any purchased Products. If any Product purchased by you is corrupted or otherwise damaged, then please contact admin@myotakuworld.com for assistance in receiving a replacement, to the extent MOW offers a replacement for such product in its sole and absolute discretion.
                            </li>
                            <li>
                                Cancellation of Payments and Purchases. Payments and purchases may not be cancelled by you, except as required by law. However, MOW reserves the right to refuse or terminate any purchase or attempted purchase at any time in its sole discretion. You understand and agree that if you authorize a Transaction with your credit card, debit card or other payment method, but your charge is rejected for any reason, then there may be a hold on your use of that transaction amount for several days.
                            </li>
                            <li>
                                Coupons. MOW may offer coupons ( <strong>“Coupons“</strong>) from time-to-time. The terms of Coupons, such as the expiration date, will be set forth on the face of the applicable Coupon. Coupons are not redeemable for cash.
                            </li>
                        </ul>
                    </li>
                    <li>
                        Title. Risk of loss and title for physical Products pass to you upon delivery of such Products to the carrier. You are responsible for filing any claims with carriers for damaged or lost shipments. Title to digital Products that you purchase will pass to you upon delivery of the Products. The purchase of a Product shall not transfer any intellectual property rights in any Products unless specifically noted.
                    </li>
                    <li>
                        Shipping. When you place an order for a physical Product, the Product will be shipped to the address you designated at the time of purchase.
                    </li>
                    <li>
                        MOW Points.
                        <ul className={style.sub}>
                            <li>
                                The Services may include an opportunity for you to earn, buy or use a type or types of virtual currency (<strong>“MOW Points“</strong>) to purchase Products in the MOW Shop.
                            </li>
                            <li>
                                MOW Points are not real money, do not have monetary value, and may never be redeemed for “real world” money or other items of monetary value from outside of the Services without our written permission. While we may use terms like “buy,” “purchase” or “sell” in reference to the MOW Points, we do so only for convenience and such terms in no way indicate that MOW Points have monetary value or are real money. You acknowledge that MOW Points are not real currency and are not redeemable for any sum of money from us at any time. We make no guarantee as to the nature, quality or value of the features of the Services or the availability or supply of MOW Points.
                            </li>
                            <li>
                                MOW Points are provided to you under a limited, personal, revocable, non-transferable, non-sublicensable license to use within the Services. MOW Points may not be transferred or re-sold in any manner, including, without limitation, by means of any direct sale or auction service. Any “virtual currency” balance shown in your account does not constitute a real-world balance or reflect any stored value, but instead constitutes a measurement of the extent of your license.
                            </li>
                            <li>
                                All MOW Points are forfeited if your account or access to the Services is terminated or suspended for any reason, in our sole and absolute discretion, or if we discontinue availability of some or all of the Services. We may at any time expire free or promotional MOW Points given to you.
                            </li>
                            <li>
                                We have no liability for hacking or loss of your MOW Points or any Products obtained via MOW Points. We have no obligation to, and will not, reimburse you for any MOW Points or any Products obtained via MOW Points that are lost due to your violation of these Terms. We reserve the right, without prior notification, to limit the quantity of MOW Points and/or to refuse to provide you with any MOW Points. Price, exchange ability and availability of MOW Points are determined by us in our sole discretion and are subject to change without notice. You agree that we have the absolute right to manage, distribute, regulate, control, modify and/or eliminate MOW Points, at any time, with or without notice, as we see fit in our sole discretion, and that we will have no liability for exercising such right.
                            </li>
                            <li>
                                You agree that under no circumstances are we liable to you for any damages or claims that may arise from the loss or use of your MOW Points regardless of the circumstances. You absolve us of any responsibility to maintain or update your MOW Points account. However, if there is a loss of MOW Points in your account due to technical or operational problems with the Services, then we will refund the lost MOW Points once the loss has been verified. Without limiting any of the foregoing provisions of this Section 9.5 of the Terms, our maximum liability or responsibility to you is to refund the MOW Points lost.
                            </li>
                            <li>
                                Redemption of MOW Points.
                                <ul className={style.sub}>
                                    <li>
                                        You may redeem your MOW Points for Products in the MOW Shop. We will, in our sole discretion, determine and communicate the availability and exchange rate for any MOW Points, which may be modified at any time. You must comply with any individual Product limitations as indicated via the Services. All redemptions are subject to these Terms and all limitations and requirements stated via the Services.
                                    </li>
                                    <li>
                                        You may choose a Product that is available for which you have sufficient MOW Points for redemption. Upon selecting the Product you wish to buy with your MOW Points, follow the instructions to complete the redemption process. As part of the redemption process, you may receive a confirmation email or message from us and/or our designee and, when applicable, an email or message containing the Products in the form of a link, code, coupon or similar means. Emails or messages will be sent to the email address or other contact information assigned to your account. You hereby authorize us to communicate with you via email.
                                    </li>
                                    <li>
                                        All acquisitions of MOW Points and redemptions for Products are final. Once MOW Points have been lost or spent, they will be subtracted from your account and cannot be refunded or returned, except in our sole discretion. No MOW Points will be re-credited to your account in the event of a return or exchange of a Product, or any problem with any Product.
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>

                    <li>
                        Subscription Plans.
                        <ul className={style.sub}>
                            <li>
                                By subscribing to this service, monthly boxes of Products shipped to your address and/or the digital services available each term at the price listed. You acknowledge that selecting Subscription Plan will have an initial and recurring payment feature and you accept responsibility for all recurring charges prior to cancellation. Your subscription will be automatically extended for successive terms at the subscription rate applied upon purchase. To cancel your next subscription at any time, you must log-in to your account and confirm cancellation to avoid the next recurring charge. MOW will continue to process recurring charges without authorization if you are subscribed to a recurring plan. Charges for Subscription Plans are paid upfront for the respective term, and will renew at the end of the term without authorization. You may receive emails regarding your account status or shipment notifications. If a cancellation request is submitted after your renewal date, you will still receive the box or are accessible to digital services you have already paid for. You will never incur any additional charges after cancellation. Any account changes (including shipping addresses and subscribed plans) shall be made before your auto renewal date so that your change would reflect on the following shipment. You understand that you are joining a Subscription Plan, which means you will be automatically billed on a recurring basis and will receive a box delivered to your mailing address and/or are accessible to the digital services each month. If you are uncertain about an auto-renewing services, please do not sign up.
                            </li>
                            <li>
                                As a User, you agree to the following benefits and Terms:  You must provide us and keep us up to date with accurate contact and payment information, including name, shipping address, phone number and credit or debit card number. If your payment is declined, your membership may be suspended and you will not receive a box or are not accessible to the digital services for the months in question. We save your payment information for ease of future shipments and charges. All such personal information is subject to the Privacy Policy and is not shared with any other parties except for payment processing reasons. You are responsible for any fees or charges your issuing bank or credit card provider may charge you. All items purchased on the Services (both shop products and subscription boxes and/or digital services) are final and non-refundable due to the perishable nature of the items. All recurring plans are non-refundable for any reason during the term.
                            </li>
                        </ul>
                    </li>
                </ul>

                <h2>
                    CROWD-SOURCED PROJECTS
                </h2>

                <ul data-aos="fade-up"  >
                    <li>
                        Definitions
                        <ul className={style.sub}>
                            <li><strong>“AON Project”</strong> st means any “All-or-Nothing” campaign on the applicable Website in which the Project Owner must raise a Minimum Amount as a precondition to the Project Owner having to deliver Rewards to Backers pursuant to these Terms.</li>
                            <li> <strong>“Backer”</strong> means any User who makes a Pledge to a Project.</li>
                            <li> <strong>“Consumer Product”</strong> means any product to be used for personal, familial or household use.</li>
                            <li> <strong>“Description”</strong> means a reasonably detailed written description of a Project that includes, at a minimum, the Rewards for Backers, the Project deadline, an estimated delivery timeline and related delivery information for any Rewards (including without limitation, the country(ies) to which the Rewards may be shipped), and, in the case of AON Projects, the Minimum Amount.</li>
                            <li> <strong>“Minimum Amount”</strong> means the minimum amount of Pledges that Users must make to the Project Owner of an AON Project as determined by the Project Owner in its sole discretion and described in the Description.</li>
                            <li> <strong>“MTO Project”</strong> means any campaign in which Users may purchase a Consumer Product the Project Owner (i) has previously developed, or will develop based on Project Feedback; and (ii) will deliver following the Project deadline in the Description pursuant to these Terms.</li>
                            <li> <strong>“Pledge”</strong> means any financial commitment that a User makes to a Project through the functionality available on the applicable Website to (i) help a Project Owner raise the Minimum Amount; or (ii) reserve a Consumer Product for purchase and delivery in an MTO Project.</li>

                            <li> <strong>“Project”</strong> or<strong> “Projects” </strong>means individually an AON Project or MTO Project, and collectively AON Projects and MTO Projects.</li>
                            <li>“Project Feedback” means any Content in connection with any Project that a User makes publicly available to other Users on the applicable Website and/or shares with Project Owners through private messages on such Website.</li>
                            <li> <strong>“Project Owner”</strong> means any party who launches a Project on the applicable Website, which may include MOW and/or any other User, as the case may be.</li>
                            <li> <strong>“Reward”</strong> means (i) any benefit that a Project Owner specifies in the applicable Description for an AON Project, which may include, without limitation, lawful services to be performed by the Project Owner; and (ii) any Consumer Products that a Project Owner specifies in the applicable Description for an MTO Project.</li>
                            <li> <strong>“Successful Projects”</strong> means, collectively, AON Projects for which the Minimum Amount has been raised prior to the Project deadline in the Description and MTO Projects for which the Project deadline has expired.</li>
                        </ul>
                    </li>
                    <li>
                        Summary. Each Website (a) provides Project Owners with a platform to launch Projects and collaborate with Users; and (b) allows Users to provide Project Feedback and Pledges to Project Owners to help support and enhance their Projects.
                    </li>
                    <li>
                        Eligibility. NOTWITHSTANDING ANYTHING TO THE CONTRARY IN THESE TERMS, (a) YOU MUST BE AT LEAST 18 YEARS OF AGE TO PARTICIPATE IN ANY PROJECT AS A PROJECT OWNER OR BACKER, AND IF YOU ARE NOT OF SUCH AGE, THEN YOU ARE HEREBY PROHIBITED FROM PARTICIPATING IN ANY PROJECT AS A PROJECT OWNER OR BACKER; AND (b) IF YOU PARTICIPATE IN ANY PROJECT AS A PROJECT OWNER OR BACKER ON BEHALF OF A SUBSCRIBING ENTITY, THEN YOU REPRESENT AND WARRANT THAT YOU ARE AN AUTHORIZED REPRESENTATIVE OF THAT SUBSCRIBING ENTITY WITH THE AUTHORITY TO BIND SUCH ENTITY TO THE TERMS IN THIS SECTION 10 AND AGREE (i) TO BE BOUND BY SUCH TERMS ON BEHALF OF SUCH SUBSCRIBING ENTITY AND (ii) THAT SUCH ENTITY WILL BE BOUND BY THESE TERMS REGARDLESS OF YOUR FUTURE EMPLOYMENT AND/OR RELATIONSHIP WITH SUCH ENTITY.
                    </li>
                    <li>
                        Project Owners.
                        <ul>
                            <li>
                                Compliance with Laws; Third Party Rights. Without limiting anything else in these Terms, including, without limitation, the terms in Section 11, each Project Owner’s Projects must (i) not violate or infringe any third party intellectual property, privacy, publicity, confidentiality or other rights; (ii) comply with all applicable laws, rules and regulations (including, without limitation, any securities laws of the United States) and otherwise comply with these Terms; (iii) must be designed to enable the Project Owner to develop Consumer Products only; and (iv) not involve any Rewards that constitute any form of (A) “security” (as such term is defined in the Securities Act of 1933); (B) participation in any profit sharing scheme; (C) food or alcoholic beverage; (D) controlled substance or drug paraphernalia; (E) explosives, weapons, ammunition or related accessories or other inherently dangerous items; (F) lottery or gambling; (G) human genetic material or remains; or (H) item or service that is or could be interpreted to be (1) abusive, bullying, defamatory, harassing, harmful, hateful, inaccurate, infringing, libelous, objectionable, obscene, offensive, pornographic, shocking, threatening, unlawful, violent, or vulgar; (2) promoting bigotry, discrimination, hatred, racism, or inciting violence; or (3) that is otherwise objectionable as determined by MOW in its sole discretion ((1), (2) and (3) collectively, <strong> “Objectionable Content“</strong>).
                            </li>
                            <li>
                                Pledge Agreements; Efforts. When a Backer makes a Pledge to a Project, a contractual agreement arises between the Backer and the applicable Project Owner (“Pledge Agreement“). For clarity, MOW is not a party to any Pledge Agreement unless MOW is acting as the Project Owner of a particular Project, in which case the term Pledge Agreement refers to these Terms. All Pledge Agreements include the following terms:

                                <ul className={style.sub}>
                                    <li>
                                        Project Owners will (A) use commercially reasonable efforts to complete their Projects in accordance with the Descriptions in all material respects; (B) not make any material misrepresentations to Backers about their Projects in the Descriptions or otherwise; and (C) if a Project Owner is unable to complete a Project in accordance with the Description, (1) post on the applicable Website a detailed explanation of the work performed, what prevented the Project Owner from completing the Project and its plan to remedy the situation; and (2) use commercially reasonable efforts to promptly remedy the situation and communicate such efforts to Backers in a timely manner.
                                    </li>
                                    <li>
                                        Once the Project Owner has completed the obligations in Section 10(b)(i), as determined by the Project Owner in its reasonable discretion and supported by reasonable documentation within the Project Owner’s possession or control, then the Project Owner has no further obligations to Backers under the Pledge Agreements.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                Project Mechanics. Project Owners will post the Descriptions on the applicable Website in a reasonably prominent and conspicuous manner prior to the commencement of their Projects. Subject to Section 10(4)(b)(i), Project Owners will provide Backers with Rewards in consideration for the Backers’ Pledges in accordance with the delivery information set forth in their Descriptions. Project Owners in their sole discretion may cancel and refund Pledges at any time, in which case they will have no obligation to provide Backers with any Rewards. If the Minimum Amount for an AON Project is not raised prior to the Project deadline set forth in the Description, then the Project Owner will refund all Pledges and will have no further obligations to the applicable Backers.
                            </li>
                            <li>
                                Services.
                                <ul>
                                    <li>
                                        Services From Project Owners. Project Owners of AON Projects may offer their services as Rewards in exchange for Pledges, provided that such services do not involve Objectionable Content. MOW may decline to provide any such services in its sole discretion. The specific terms governing the provision of such services will be agreed to by the Project Owner and each Backer in separate agreements, and MOW is not a party or otherwise liable in any way under or in connection with those agreements.
                                    </li>
                                    <li>
                                        Services From MOW . A Project Owner may request that MOW administers the delivery of the applicable Rewards to, and/or otherwise provides necessary liaison services with, Backers in connection with its Projects. The specific terms that relate to such services will be set forth in a separate written agreement between MOW and each such Project Owner.
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                        Backers. If you participate in a Project as a Backer, then you acknowledge and agree that (a) in order to receive Rewards, you must provide to Project Owners through the functionality available on the applicable Website certain information at the time you make a Pledge; (b) if a Project Owner needs additional information from you to fulfill a Reward, then you will provide such additional information within a reasonable period of time; (c) you may not cancel or reduce Pledges once they have been made unless otherwise agreed in writing by the applicable Project Owner; (d) your payment method will be charged for your Pledges at the time you make them; (e) you are responsible for paying all of your Pledges and any additional costs imposed by MOW’s third party payment processor; (f) delivery dates in the Description are only estimates and may be subject to change; and (g) a Project Owner will have no further obligations to you in the event the Project Owner satisfies its obligation under Section 10(4)(b)(i)(C).
                    </li>
                    <li>
                        Fees. MOW will collect a percentage of the aggregate amount of Pledges made for Successful Projects (“Fees“). Project Owners may sell Consumer Products that they manufacture through their Projects through the MOW Shop upon entering into a prior written agreement with MOW . MOW may change the Fees in its sole discretion. MOW will provide advance notice of any increase in the Fees before they go into effect. Fees take effect once they are accessible through the link set forth in the first sentence of this Section 10.6.
                    </li>
                    <li>
                        Cancellation. In cases where MOW is not the Project Owner, MOW reserves the right in its sole discretion to require a Project Owner to cancel any of its Projects for any or no reason upon notice, including, without limitation, in cases where the Project Owner has breached these Terms. Upon any cancellation under this Section 10.7, the applicable Project Owner must promptly arrange for Pledges to be refunded to Backers.
                    </li>
                    <li>
                        Disclaimer. THE FOLLOWING TERMS APPLY TO ANY PROJECT IN WHICH MOW IS NOT THE PROJECT OWNER: MOW MERELY PROVIDES A TECHNOLOGY PLATFORM THAT HELPS FACILITATE PROJECTS. ACCORDINGLY, WITHOUT LIMITING ANYTHING ELSE IN THESE TERMS, AND TO THE FULLEST EXTENT PERMITTED BY LAW, YOU HEREBY ACKNOWLEDGE AND AGREE THAT MOW WILL HAVE NO LIABILITY TO YOU OR ANY OTHER PARTY WHATSOEVER UNDER ANY THEORY IN CONNECTION WITH SUCH PROJECTS, INCLUDING, WITHOUT LIMITATION, WITH RESPECT TO ANY DISPUTES BETWEEN BACKERS AND PROJECT OWNERS REGARDING PLEDGES OR OTHERWISE UNDER PLEDGE AGREEMENTS TO WHICH MOW IS NOT A PARTY.
                    </li>
                    <li>
                        Order of Precedence. If there is any conflict between these Terms and either agreement referenced in Section 10(4)(d)(ii) or 10.6, the latter agreement(s) will control solely to the extent of the conflict or inconsistency.
                    </li>
                </ul>

                <h2>
                    PROHIBITED ACTIVITIES
                </h2>
                <ul data-aos="fade-up" >
                    <li>
                        In using the Services you agree not to:
                        <ul className={style.sub}>
                            <li>Create a false identity or impersonate another person or entity in any way;</li>
                            <li>Upload or otherwise transmit to or through the Services any information or content that infringes any patent, trademark, trade secret, copyright or other proprietary rights of any party, including by incorporating any such material in your User Content;</li>
                            <li>Upload or otherwise transmit to or through the Services any Objectionable Content;</li>
                            <li>Upload or otherwise transmit to or through the Services any material that can cause harm or delay to the Service or computers of any kind;</li>
                            <li>Upload, post or otherwise transmit any unsolicited or unauthorized advertising, promotional materials, junk mail, spam, chain letters, pyramid schemes or any other form of solicitation (commercial or otherwise) except as provided in Section 10;</li>
                            <li>Restrict, discourage or inhibit any person from using the Services, disclose personal information about a third person on the Service or obtained from the Services without the consent of such person, or collect information about users of the Services;</li>
                            <li>Undertake, cause, permit or authorize the modification, creation of derivative works, translation, reverse engineering, decompiling, disassembling or hacking of any aspect of the Services or any part thereof, or attempt to do any of the foregoing, except and solely to the extent permitted by these Terms, the authorized features of the Services, or by law, or otherwise attempt to use or access any portion of the Services other than as intended by MOW;</li>
                            <li>Gain unauthorized access to the Services, to other users’ accounts, names or personally identifiable information, or to other computers or websites connected or linked to the Services;</li>
                            <li>Reproduce, distribute, publicly display, publicly perform, sell, trade, resell or exploit any portion of the Services, use of the Services, access to the Services or User Content obtained through the Services, for any purpose other than expressly permitted by these Terms, including, by way of example and not limitation, by doing or engaging in any of the following without MOW’s express written consent:
                                <ul>
                                    <li>
                                        copying, caching or reformatting any materials accessed through the Services for commercial purposes in any fashion whatsoever, whether by copying to physical or electronic media for purposes of buffering delivery or converting transmissions from the Services to alternative delivery formats;
                                    </li>
                                    <li>
                                        framing, embedding and/or passing off information obtained from the Services in such a manner as to present them as originating from a source other than the Services;
                                    </li>
                                    <li>
                                        altering, defacing, mutilating or otherwise bypassing any approved software through which the Services are made available; and
                                    </li>
                                    <li>
                                        using any trademarks, service marks, design marks, logos, photographs or other Content belonging to MOW or obtained from the Services.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                Post, transmit or otherwise make available any virus, worm, spyware or any other computer code, file or program that may or is intended to damage or hijack the operation of any hardware, software or telecommunications equipment, or any other aspect of the Services or communications equipment and computers connected to the Services;
                            </li>
                            <li>
                                Remove, disable, damage, circumvent or otherwise interfere with any security-related features of the Services, features that prevent or restrict the use or copying of any part of the Services or any Content (including User Content) accessible on or through the Services, or features that enforce limitations on the use of the Services or any Content accessible on or through the Service;
                            </li>
                            <li>
                                Use any scraper, spider, robot or other automated means of any kind to access the Services, except and solely to the extent permitted by these Terms and the features of the Services, deep-link to any feature or Content (including User Content) on the Service, bypass our robot exclusion headers or other measures we may use to prevent or restrict access to the Service;
                            </li>
                            <li>
                                Interfere with or disrupt the Services, networks or servers connected to the Services or violate the regulations, policies or procedures of such networks or servers;
                            </li>
                            <li>
                                Violate any applicable federal, state or local laws or regulations or these Terms; or
                            </li>
                            <li>
                                Assist or permit any persons in engaging in any of the activities described above.
                            </li>
                        </ul>
                    </li>
                </ul>

                <h2>
                    DISCLAIMER OF CONTENT (INCLUDING USER CONTENT)
                </h2>
                <p data-aos="fade-up">
                    THE FOLLOWING TERMS IN THIS SECTION 12 APPLY TO THE FULLEST EXTENT PERMITTED BY LAW:
                </p>

                <ul data-aos="fade-up">
                    <li>
                        YOU UNDERSTAND THAT WHEN USING THE SERVICES, YOU MAY BE EXPOSED TO CONTENT (INCLUDING USER CONTENT) FROM A VARIETY OF SOURCES, AND THAT MOW IS NOT RESPONSIBLE FOR THE ACCURACY, INTEGRITY, QUALITY, LEGALITY, USEFULNESS, SAFETY, OR INTELLECTUAL PROPERTY RIGHTS OF OR RELATING TO SUCH CONTENT. YOU FURTHER UNDERSTAND AND ACKNOWLEDGE THAT YOU MAY BE EXPOSED TO CONTENT (INCLUDING USER CONTENT) THAT IS INACCURATE, OFFENSIVE, INDECENT, OR OBJECTIONABLE, AND YOU AGREE TO WAIVE, AND HEREBY DO WAIVE, ANY LEGAL OR EQUITABLE RIGHTS OR REMEDIES YOU HAVE OR MAY HAVE AGAINST MOW WITH RESPECT THERETO.
                    </li>
                    <li>
                        UNDER NO CIRCUMSTANCES WILL MOW BE LIABLE IN ANY WAY FOR OR IN CONNECTION WITH ANY CONTENT (INCLUDING USER CONTENT), INCLUDING, BUT NOT LIMITED TO, FOR ANY INACCURACIES, ERRORS OR OMISSIONS IN ANY CONTENT, OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT (INCLUDING USER CONTENT) OR PRODUCTS DISPLAYED, PERFORMED, TRANSMITTED OR ACCESSIBLE ON OR THROUGH THE SERVICES. BY ACCESSING OR USING ANY CONTENT (INCLUDING USER CONTENT) DISPLAYED, PERFORMED, TRANSMITTED OR ACCESSIBLE ON OR THROUGH THE SERVICES, YOU WAIVE ANY AND ALL CLAIMS AGAINST MOW THAT YOU MAY HAVE ARISING OUT OF OR RELATING TO SUCH CONTENT.
                    </li>
                    <li>
                        Retaining Backup Copies. MOW DOES NOT GUARANTEE THE CONTINUED AVAILABILITY OF USER CONTENT, AND MAY DELETE ANY USER CONTENT FROM THE SERVICES AT ANY TIME. YOU ARE SOLELY RESPONSIBLE FOR ENSURING THAT YOU RETAIN COPIES OF ANY USER CONTENT YOU UPLOAD TO THE SERVICES.
                    </li>
                </ul>

                <h2>
                    LINKS TO THIRD PARTY SITES
                </h2>

                <ul data-aos="fade-up">
                    <li>
                        Links. The Services provide links to Third Party Sites. These links are for convenience only. If you use these links, you will leave the Services. MOW is not responsible for the availability of or the content provided by these Third Party Sites, or for any viruses or other damaging elements encountered in linking to a Third Party Site, whether or not MOW is affiliated with the owners of such Third Party Sites. In addition, the linking to Third Party Sites is not an endorsement or approval by MOW of the organizations owning, operating, or sponsoring such Third Party Sites or their products or services. These Terms do not apply to Third Party Sites, and you should review applicable terms and policies, including any relevant privacy policies, associated with any Third Party Sites. Notwithstanding the immediately preceding sentence, the use of any portion or feature of the Services available on or through a Third Party Site will continue to be subject to these Terms.
                    </li>
                    <li>
                        No Liability for Third Party Sites. YOU AGREE THAT MOW WILL NOT BE RESPONSIBLE OR LIABLE FOR ANY LOSS OR DAMAGE OF ANY SORT INCURRED AS THE RESULT OF ANY SUCH DEALINGS YOU MAY HAVE ON OR THROUGH A THIRD PARTY SITE OR AS THE RESULT OF THE PRESENCE OF ANY THIRD PARTY ADVERTISING ON THE SERVICE.
                    </li>
                </ul>

                <h2>
                    INDEMNITY
                </h2>
                <ul data-aos="fade-up">
                    <li>
                        To the fullest extent permitted by law, you agree to indemnify, defend, and hold harmless MOW and its parent, subsidiaries, affiliates, investors, partners, sublicensees or any related companies, licensors and suppliers, and its and their respective directors, officers, employees, agents, representatives, contractors, and assigns from all damages, injuries, liabilities, costs, fees and expenses (including, but not limited to, attorneys’ fees and court costs) arising from or in any way related to: (a) your use or misuse of the Services; (b) your breach or other violation of these Terms, including any representations, warranties and covenants herein; (c) any User Content uploaded by you on or through the Services; or (d) your violation of the rights of any other person or entity, including any intellectual property or other protected rights. Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us if we, in our reasonable discretion, conclude that you are not adequately protecting our interests or are incapable of protecting our interests, and you agree to cooperate with our defense of these claims. We shall provide you with notice (email shall suffice) in the event we assume the defense or control of any matter pursuant to this Section 14; provided we have information necessary for contacting you. You agree not to settle any matter for which you are obligated to indemnify MOW without the prior written consent of MOW . We will use reasonable efforts to notify you of any such claim, action or proceeding for which it is seeking indemnity from you upon becoming aware of it, but MOW’s inability to contact you shall not relieve you of your indemnification obligation.
                    </li>
                </ul>

                <h2>
                    ADDITIONAL DISCLAIMERS
                </h2>

                <p>
                    THE FOLLOWING TERMS IN THIS SECTION 15 APPLY TO THE FULLEST EXTENT PERMITTED BY LAW:
                </p>

                <ul>
                    <li>
                        THE SERVICES AND ANY CONTENT AND PRODUCTS ACCESSIBLE ON AND THROUGH THE SERVICES (INCLUDING USER CONTENT) ARE PROVIDED BY MOW ON AN <strong>“AS IS,”</strong> “<strong> AS AVAILABLE</strong>,”  <strong>“WITH ALL FAULTS</strong>” BASIS WITHOUT REPRESENTATIONS OR WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IN TERMS OF CORRECTNESS, ACCURACY, RELIABILITY OR OTHERWISE.
                    </li>
                    <li>
                        MOW AND ITS AFFILIATES, PARTNERS, LICENSORS, AND SUPPLIERS HEREBY DISCLAIM ALL EXPRESS, IMPLIED AND STATUTORY WARRANTIES OF ANY KIND, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT.  NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM MOW, AN EMPLOYEE OR REPRESENTATIVE OF MOW OR THROUGH THE SERVICES WILL CREATE ANY WARRANTY NOT EXPRESSLY STATED IN THESE TERMS.  MOW AND ITS AFFILIATES, PARTNERS, LICENSORS, AND SUPPLIERS DO NOT WARRANT THAT THE SERVICES OR ANY PART THEREOF, OR ANY PRODUCTS OR CONTENT OFFERED THROUGH THE SERVICES, WILL BE UNINTERRUPTED, OR FREE OF ERRORS, VIRUSES OR OTHER HARMFUL COMPONENTS, AND DO NOT WARRANT THAT ANY OF THE FOREGOING WILL BE CORRECTED.  YOU UNDERSTAND AND AGREE THAT YOU USE, ACCESS, DOWNLOAD, OR OTHERWISE OBTAIN CONTENT AND PRODUCTS THROUGH THE SERVICES OR ANY THIRD PARTY SITES AT YOUR OWN DISCRETION AND RISK AND THAT YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR PROPERTY (INCLUDING YOUR COMPUTER SYSTEM USED IN CONNECTION WITH THE SERVICES) OR LOSS OF DATA THAT RESULTS FROM THE DOWNLOAD OR USE OF SUCH CONTENT OR PRODUCTS.  ALL PRODUCTS PURCHASED ON OR THROUGH THE SERVICES, WHETHER PURCHASED FROM MOW OR A THIRD PARTY, ARE SUBJECT ONLY TO ANY APPLICABLE WARRANTIES OF THEIR RESPECTIVE MANUFACTURERS, DISTRIBUTORS AND SUPPLIERS, IF ANY. MOW HEREBY DISCLAIMS ALL WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, ANY IMPLIED WARRANTIES WITH RESPECT TO THE PRODUCTS LISTED OR PURCHASED ON OR THROUGH THE SERVICES.  WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, MOW HEREBY EXPRESSLY DISCLAIMS ALL LIABILITY FOR PRODUCT DEFECT OR FAILURE, CLAIMS THAT ARE DUE TO NORMAL WEAR, PRODUCT MISUSE, ABUSE, PRODUCT MODIFICATION, IMPROPER PRODUCT SELECTION, NON-COMPLIANCE WITH ANY CODES, OR MISAPPROPRIATION. MOW MAKES NO WARRANTIES TO THOSE DEFINED AS “CONSUMERS” IN THE MAGNUSON-MOSS WARRANTY-FEDERAL TRADE COMMISSION IMPROVEMENTS ACT.
                    </li>
                </ul>

                <h2>
                    LIMITATIONS
                </h2>

                <ul>
                    <li>
                        IN NO EVENT WILL MOW OR ITS OFFICERS, DIRECTORS, LICENSORS OR SUPPLIERS BE LIABLE TO ANY PARTY FOR ANY DIRECT, INDIRECT, SPECIAL OR OTHER CONSEQUENTIAL DAMAGES ARISING OUT OF OR IN CONNECTION WITH THE USE OR ACCESS OF OR INABILITY TO USE OR ACCESS THE SERVICES OR ANY CONTENT MADE AVAILABLE OR PRODUCTS PURCHASED THROUGH THE SERVICES, INCLUDING, WITHOUT LIMITATION, ANY LOST PROFITS, BUSINESS INTERRUPTION, OR OTHERWISE, WHETHER BASED IN TORT, CONTRACT OR OTHER LEGAL THEORY, EVEN IF MOW OR ITS LICENSORS OR SUPPLIERS ARE EXPRESSLY ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IN NO EVENT SHALL MOW OR ITS LICENSORS OR SUPPLIERS BE LIABLE IN THE AGGREGATE FOR ANY DAMAGES INCURRED BY YOU THAT EXCEED THE GREATER OF (1) ONE HUNDRED DOLLARS ($100.00) OR (2) THE AMOUNT OF FEES YOU HAVE PAID MOW (IF ANY) IN THE 12 MONTHS PRIOR TO THE ACTION GIVING RISE TO THE LIABILITY.
                    </li>
                </ul>

                <h2>
                    TERM AND TERMINATION
                </h2>

                <ul>
                    <li>
                        Term. These Terms, as amended, will be effective commencing with your first use or registration of the Services and will remain in full force and effect until terminated as set forth below.
                    </li>
                    <li>
                        Termination by MOW. MOW may terminate your use of the Services or any of our features or services at any time and for any reason, with or without notice, including, but not limited to, for conduct violating these Terms or upon MOW’s sole determination as necessary to protect the Services, other Users of the Services, or MOW or its partners and affiliates. You hereby agree to MOW’s broad right of termination. You agree that if your use of the Services is terminated pursuant to these Terms, then you will not attempt to use the Services under any name, real or assumed, and further agree that if you violate this restriction after being terminated, then you will indemnify and hold us harmless from any and all liability that we may incur therefor.
                    </li>
                    <li>
                        Termination by You. You are free to terminate your use of the Services at any time. You can simply choose to stop visiting or using any aspect of the Services. If you wish to terminate your account on the Services, you may do so by sending an e-mail to admin@myotakuworld.com or using any other account termination functionality that may be offered through the Services.
                    </li>
                </ul>

                <h2>
                    Affiliate Disclosure
                </h2>

                <p>
                    My Otaku World works with many affiliate programs which pay us on a commission basis.
                </p>

                <p>
                    This commission helps us earn money without charging you(the customer) any extra fees. This type of monetization style does not affect our editorial standards which always look to promote the best products regardless of where they are sold or whether they have an affiliate program or not.
                </p>

                <p>
                    These commissions are not paid reviews and we are never paid directly(nor do we accept money directly) in exchange for positive reviews.
                </p>

                <p>
                    As of this writing, My Otaku World currently works with a handful of affiliates which include(but are not limited to) Etsy, eBay, Amazon, and Kidrobot.
                </p>

                <p>
                    My Otaku World is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
                </p>

                <p>
                    As an Amazon Associate My Otaku World earns from qualifying purchases.
                </p>

                <h2>
                    Images & Media
                </h2>

                <p data-aos="fade-up">
                    All media on this website is either A) embedded following a website’s terms of use, or B) hosted locally on this website and placed into content following the fair use exception under US copyright law with a “transformative” purpose to the work.
                </p>

                <p data-aos="fade-up">
                    And we take copyright infringement very seriously. If you see a piece of work on My Otaku World that you’ve created and you want to see it taken off the website please contact us immediately. We comply with all takedown requests as long as you can show that you are the true copyright holder of the image or piece of media.
                </p>
                <p data-aos="fade-up">
                    However, certain embedded materials, such as videos from YouTube, are embedded following their terms of service. If there is a YouTube video that you do not want embedded on this website you can still contact us, but given YouTube’s licensing we may continue to keep it embedded.
                </p>

                <p data-aos="fade-up" >
                    Self-hosted media such as artwork or images will always be removed when an author/creator/copyright holder asks us to remove it.
                </p>

                <p data-aos="fade-up">
                    My Otaku World also publishes some unofficial Fan Content related to Wizards of the Coast IP, permitted under the <a style={{ color: '#d33', cursor: 'pointer', textDecoration: 'none' }} href="https://company.wizards.com/en/legal/fancontentpolicy"> Fan Content Policy</a>. Not approved/endorsed by Wizards. Portions of the materials used are property of Wizards of the Coast. © Wizards of the Coast LLC.
                </p>

                <h2>
                    NOTICE AND PROCEDURE FOR MAKING CLAIMS OF COPYRIGHT OR OTHER INTELLECTUAL PROPERTY INFRINGEMENTS
                </h2>

                <ul data-aos="fade-up">
                    <li>
                        MOW respects the intellectual property of others and takes the protection of copyrights and all other intellectual property very seriously, and we ask our users to do the same. Infringing activity will not be tolerated on or through the Services.
                    </li>
                    <li>
                        MOW’s intellectual property policy is to (a) remove or disable access to Content or materials that MOW believes in good faith, upon notice from an intellectual property owner or their agent, is infringing the intellectual property of a third party by being made available through the Services, and (b) remove any Content posted to the Services by “repeat infringers.” MOW considers a “repeat infringer” to be any user that has uploaded User Content to the Services and for whom MOW has received more than two takedown notices compliant with the provisions of 17 U.S.C. § 512(c) with respect to such User Content. MOW has discretion, however, to terminate the account of any user after receipt of a single notification of claimed infringement or upon MOW’s own determination.
                    </li>
                    <li>
                        Procedure for Reporting Claimed Infringement.

                        <ul className={style.sub}>
                            <li>
                                If you believe that any Content accessible on or through the Services infringes an intellectual property right you own or control, then please promptly send a “ <strong>Notification of Claimed Infringement</strong>” containing the following information to the Designated Agent identified below. Your communication must include substantially the following:
                            </li>
                            <ul>
                                <li>
                                    A physical or electronic signature of a person authorized to act on behalf of the owner of the work(s) that has/have been allegedly infringed;
                                </li>
                                <li>
                                    Identification of works or materials being infringed, or, if multiple works are covered by a single notification, then a representative list of such works;
                                </li>
                                <li>
                                    Identification of the specific material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit MOW to locate the material;
                                </li>
                                <li>
                                    Information reasonably sufficient to permit MOW to contact you, such as an address, telephone number, and, if available, an electronic mail address at which you may be contacted;
                                </li>
                                <li>
                                    A statement that you have a good faith belief that the use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law; and
                                </li>
                                <li>
                                    A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed. You should consult with your own lawyer and/or see 17 U.S.C. § 512 of the United States Copyright Act to confirm your obligations to provide a valid notice of claimed infringement.
                                </li>
                            </ul>

                        </ul>
                    </li>
                    <li>
                        Designated Agent Contact Information. MOW’s Designated Agent for notices of claimed infringement can be contacted at:Via E-mail: admin@myotakuworld.com
                    </li>
                    <li>
                        Counter Notification.

                        <ul className={style.sub}>
                            <li>
                                If you receive a notification from MOW that material made available by you on or through the Services has been the subject of a Notification of Claimed Infringement, then you will have the right to provide MOW with what is called a “<strong>Counter Notification.</strong>” To be effective, a Counter Notification must be in writing, provided to MOW’s Designated Agent through one of the methods identified in Section 18.4, and include substantially the following information:
                                <ul>
                                    <li>
                                        A physical or electronic signature of the subscriber;
                                    </li>
                                    <li>
                                        Identification of the material that has been removed or to which access has been disabled and the location at which the material appeared before it was removed or access to it was disabled;
                                    </li>
                                    <li>
                                        A statement under penalty of perjury that the subscriber has a good faith belief that the material was removed or disabled as a result of mistake or misidentification of the material to be removed or disabled; and
                                    </li>
                                    <li>
                                        The subscriber’s name, address, and telephone number, and a statement that the subscriber consents to the jurisdiction of Federal District Court for the judicial district in which the address is located, or if the subscriber’s address is outside of the United States, for any judicial district in which MOW may be found, and that the subscriber will accept service of process from the person who provided notification under Section 18.3 above or an agent of such person.
                                    </li>
                                </ul>
                                <li>
                                    A party submitting a Counter Notification should consult a lawyer or see 17 U.S.C. § 512 to confirm the party’s obligations to provide a valid counter notification under the Copyright Act.
                                </li>
                            </li>
                        </ul>
                    </li>
                    <li>
                        False Notifications of Claimed Infringement or Counter Notifications. The Copyright Act provides that:any person who knowingly materially misrepresents under [Section 512 of the Copyright Act (17 U.S.C. § 512)] (1) that material or activity is infringing, or (2) that material or activity was removed or disabled by mistake or misidentification, shall be liable for any damages, including costs and attorneys’ fees, incurred by the alleged infringer, by any copyright owner or copyright owner’s authorized licensee, or by a service provider, who is injured by such misrepresentation, as the result of the service provider relying upon such misrepresentation in removing or disabling access to the material or activity claimed to be infringing, or in replacing the removed material or ceasing to disable access to it.
                    </li>
                    <li>
                        U.S.C. § 512(f).
                    </li>

                </ul>
                <p data-aos="fade-up">
                    MOW reserves the right to seek damages from any party that submits a notification of claimed infringement in violation of the law.
                </p>
                <p>
                    For the avoidance of doubt, only notices submitted under the Digital Millennium Copyright Act and the procedures set forth in this Section 18 should be sent to the Designated Agent at admin@myotakuworld.com or to the postal address identified above. Any other comments, compliments, complaints or suggestions about MOW, the operation of the Services or any other matter should be sent to admin@myotakuworld.com.
                </p>

                <h2>
                    MISCELLANEOUS
                </h2>

                <ul data-aos="fade-up">
                    <li>Governing Law; Entire Agreement. This is the entire agreement between you and MOW relating to the subject matter herein and supersedes all previous communications, representations, understandings and agreements, either oral or written, between the parties with respect to said subject matter. These Terms shall not be modified except in a writing, signed by both parties, or by a change to these Terms made by MOW as authorized in these Terms. These Terms will be governed solely by the laws of the State of Oregon, without regard to its conflicts of laws principles.</li>
                    <li>Waiver. A provision of these Terms may be waived only by a written instrument executed by the party entitled to the benefit of such provision. The failure of MOW to exercise or enforce any right or provision of these Terms will not constitute a waiver of such right or provision.</li>
                    <li>Severability. If any provision of these Terms shall be unlawful, void, or for any reason unenforceable, then that provision shall be deemed severable from these Terms and shall not affect the validity and enforceability of any remaining provisions.</li>
                    <li>Assignment. These Terms, and any rights and licenses granted hereunder, may not be transferred or assigned by you, but may be assigned by MOW without restriction. Any assignment attempted to be made by you in violation of these Terms shall be void. These Terms will be binding upon and inure to the benefit of the parties hereto, and permitted successors and assigns.</li>
                    <li>No Agency. You agree that no joint venture, partnership, employment, or agency relationship exists between you and MOW as a result of these Terms or use of the Services.</li>
                    <li>Survival. The provisions of these Terms that are intended to survive the termination of these Terms by their nature will survive the termination of these Terms, including, but not limited to, Sections 4 (Privacy), 5 (Service Security), 7.4(d) (Survival of Rights for Removed User Content); 7.2-7.4 (Licenses), 8 (Monitoring and Removing Content; Reliance on User Content), 10 (Crowd-Sourced Projects), 11 (Prohibited Activities), 12 (Disclaimer of Content, Including User Content), 13 (Links to Third Party Sites), 14 (Indemnity), 15 (Additional Disclaimers), 16 (Limitations), 17 (Term and Termination), 19 (Dispute Resolution), and 20 (Miscellaneous).</li>
                    <li>Headings. The heading references herein are for convenience purposes only, do not constitute a part of these Terms, and shall not be deemed to limit or affect any of the provisions hereof.</li>
                    <li>E-mail Communications. You hereby authorize MOW to communicate with you about the Service via email during the Term and at least once following the Term to confirm any termination of these Terms.</li>

                </ul>
            </section>

            <Shareit/>




            <Link />

            <div className={style.divider}>
                <hr className={style.lines} />
            </div>

            <footer>
                <p>© 2019-2023 MyOtakuWorld</p>
                <p>All other assets and trademarks are property of their original owners.</p>
                <p>MyOtakuWorld is neither affiliated with nor endorsed any brands and trademarks on this site unless explicitly stated.</p>
            </footer>

        </div>
    )
}

export default TermsOfUse
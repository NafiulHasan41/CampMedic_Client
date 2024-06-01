// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import Slide from './Slide'



export default function Carousel() {
  return (
    <div className='w-full'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper w-full'
      >
        <SwiperSlide >
          <Slide
            image="https://i.ibb.co/RykHN5m/a-high-resolution-photo-capturing-a-compassionate-uv-COEp9-KR5-Fez2q-J-a-Y6w-C2-Gfrw7-FRm2f-U37-Ww-S.jpg"
            text={`Transforming Lives Through Healthcare`}
            text1={`Witness the joy and relief as we provide essential medical services to underserved communities.`}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image="https://i.ibb.co/2dZjqgV/a-heartwarming-group-photo-of-a-diverse-team-of-me-v-C19qn-Ov-R2i8q-QUpsj-Ygeg-5-RQ8tj-Jg-Tnq-UZ5j-U.jpg"
            text={`Community Care in Action`}
            text1={`Celebrating the spirit of collaboration and the impact of our dedicated volunteers.`}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image="https://i.ibb.co/8b0FTnQ/a-panoramic-view-of-a-bustling-medical-camp-showca-Rbvo2t1-HRSOg-UPd-Xm-DAy-Fw-q-PSh-PLxo-QP61xd-Tjq.jpg"
            text='Comprehensive Care for All'
            text1="From diagnosis to treatment, see how our camps provide holistic healthcare solutions."
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image="https://i.ibb.co/sg2CJhd/a-close-up-of-a-patient-s-face-expressing-gratitud-Pp-P0z5-Dz-STex-TY1w0-NEEn-A-I0-Tu-ZZph-SSOec-HS6.jpg"
            text='Gratitude and Hope'
            text1="Stories of hope and resilience from those who have benefited from our medical services."
          />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
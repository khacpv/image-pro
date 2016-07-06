/*
 * faceimg.cpp
 *
 *  Created on: Jul 5, 2016
 *      Author: nam
 */
#include "source.cpp"
#include <dlib/image_processing/frontal_face_detector.h>
#include <dlib/gui_widgets.h>
#include <dlib/image_io.h>
#include <iostream>
#include <sstream>

std::string faceImg::process(std::string img_path){
	std::string str;
	dlib::array2d<unsigned char> img;
	dlib::frontal_face_detector detector = dlib::get_frontal_face_detector();

	dlib::load_image(img_color, img_path);
	dlib::assign_image(img, img_color);

	//dlib::pyramid_up(img);
	//dlib::pyramid_up(img_color);

	rects = detector(img);
	for (int i = 0; i < rects.size(); i++){
		dlib::rectangle tmp = rects[i];
		std::ostringstream ss;
		ss << tmp.left();
		ss << ",";
		ss << tmp.right();
		ss << ",";
		ss << tmp.bottom();
		ss << ",";
		ss << tmp.top();
		str = str + ss.str() + ";";
	}
	return str;
}




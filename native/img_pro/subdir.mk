################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
CPP_SRCS += \
../source.cpp 

OBJS += \
./source.o 

CPP_DEPS += \
./source.d 


# Each subdirectory must supply rules for building sources it contributes
%.o: ../%.cpp
	@echo 'Building file: $<'
	@echo 'Invoking: Cross G++ Compiler'
	g++ -DENABLE_PNG_SUPPORT -DENABLE_JPEG_SUPPORT -I/home/nam/dlib/dlib-19.0/dlib/all -I/home/nam/dlib/dlib-19.0/dlib/external/libjpeg -I/home/nam/dlib/dlib-19.0/dlib/external/libpng -I/home/nam/dlib/dlib-19.0/dlib/external/zlib -I/home/nam/dlib/dlib-19.0 -I/home/nam/workspace/facedet -O0 -g3 -Wall -c -fmessage-length=0 -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@:%.o=%.d)" -o "$@" "$<"
	@echo 'Finished building: $<'
	@echo ' '



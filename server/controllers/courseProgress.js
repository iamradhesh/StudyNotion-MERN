const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");




exports.updateCourseProgress = async(req,res)=>{
    const {courseId,subSectionId} = req.body;
    const userId = req.user.id;

    try{
        //check if subsection is valid or not

        const subSection = await SubSection.findById(subSectionId);

        if(!subSection) {
            return res.satus(404).json({
                success:false,
                error:"Invalid SubSection"
            });
        }

        //check for old entry
        let courseProgress = await CourseProgress.findOne({
            courseID:courseId,
            userId:userId,
        });

        if(!courseProgress) {
            return res.status(404).json({
                success:false,
                message:"Course Progress does not exist"
            });
        }
        else{
            //check for re-completeting video/subsection

            if(courseProgress.completedVideos.includes(subSectionId))
            {
                return res.status(400).json({
                    error:"SubSection already completed"
                })
            }
            else{
                //push
                courseProgress.completedVideos.push(subSectionId);
            }
 
            await courseProgress.save();
            return res.status(200).json({
                success:true,
                message:"Course Progress has been updated"
            })
        }
    }
    catch(error)
    {
        console.error(error)
        return res.status(500).json({
            error:"Internal Server Error"
        })
    }
}
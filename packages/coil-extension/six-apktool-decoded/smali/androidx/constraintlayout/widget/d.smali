.class public Landroidx/constraintlayout/widget/d;
.super Ljava/lang/Object;
.source ""


# annotations
.annotation system Ldalvik/annotation/MemberClasses;
    value = {
        Landroidx/constraintlayout/widget/d$a;
    }
.end annotation


# static fields
.field private static final a:[I

.field private static b:Landroid/util/SparseIntArray;


# instance fields
.field private c:Ljava/util/HashMap;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/HashMap<",
            "Ljava/lang/Integer;",
            "Landroidx/constraintlayout/widget/d$a;",
            ">;"
        }
    .end annotation
.end field


# direct methods
.method static constructor <clinit>()V
    .locals 4

    const/4 v0, 0x3

    new-array v1, v0, [I

    fill-array-data v1, :array_0

    sput-object v1, Landroidx/constraintlayout/widget/d;->a:[I

    new-instance v1, Landroid/util/SparseIntArray;

    invoke-direct {v1}, Landroid/util/SparseIntArray;-><init>()V

    sput-object v1, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget-object v1, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v2, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintLeft_toLeftOf:I

    const/16 v3, 0x19

    invoke-virtual {v1, v2, v3}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v1, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v2, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintLeft_toRightOf:I

    const/16 v3, 0x1a

    invoke-virtual {v1, v2, v3}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v1, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v2, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintRight_toLeftOf:I

    const/16 v3, 0x1d

    invoke-virtual {v1, v2, v3}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v1, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v2, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintRight_toRightOf:I

    const/16 v3, 0x1e

    invoke-virtual {v1, v2, v3}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v1, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v2, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintTop_toTopOf:I

    const/16 v3, 0x24

    invoke-virtual {v1, v2, v3}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v1, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v2, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintTop_toBottomOf:I

    const/16 v3, 0x23

    invoke-virtual {v1, v2, v3}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v1, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v2, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintBottom_toTopOf:I

    const/4 v3, 0x4

    invoke-virtual {v1, v2, v3}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v1, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v2, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintBottom_toBottomOf:I

    invoke-virtual {v1, v2, v0}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintBaseline_toBaselineOf:I

    const/4 v2, 0x1

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_editor_absoluteX:I

    const/4 v2, 0x6

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_editor_absoluteY:I

    const/4 v2, 0x7

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintGuide_begin:I

    const/16 v2, 0x11

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintGuide_end:I

    const/16 v2, 0x12

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintGuide_percent:I

    const/16 v2, 0x13

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_orientation:I

    const/16 v2, 0x1b

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintStart_toEndOf:I

    const/16 v2, 0x20

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintStart_toStartOf:I

    const/16 v2, 0x21

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintEnd_toStartOf:I

    const/16 v2, 0xa

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintEnd_toEndOf:I

    const/16 v2, 0x9

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_goneMarginLeft:I

    const/16 v2, 0xd

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_goneMarginTop:I

    const/16 v2, 0x10

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_goneMarginRight:I

    const/16 v2, 0xe

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_goneMarginBottom:I

    const/16 v2, 0xb

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_goneMarginStart:I

    const/16 v2, 0xf

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_goneMarginEnd:I

    const/16 v2, 0xc

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintVertical_weight:I

    const/16 v2, 0x28

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintHorizontal_weight:I

    const/16 v2, 0x27

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintHorizontal_chainStyle:I

    const/16 v2, 0x29

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintVertical_chainStyle:I

    const/16 v2, 0x2a

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintHorizontal_bias:I

    const/16 v2, 0x14

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintVertical_bias:I

    const/16 v2, 0x25

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintDimensionRatio:I

    const/4 v2, 0x5

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintLeft_creator:I

    const/16 v2, 0x4b

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintTop_creator:I

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintRight_creator:I

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintBottom_creator:I

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintBaseline_creator:I

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_layout_marginLeft:I

    const/16 v2, 0x18

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_layout_marginRight:I

    const/16 v2, 0x1c

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_layout_marginStart:I

    const/16 v2, 0x1f

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_layout_marginEnd:I

    const/16 v2, 0x8

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_layout_marginTop:I

    const/16 v2, 0x22

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_layout_marginBottom:I

    const/4 v2, 0x2

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_layout_width:I

    const/16 v2, 0x17

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_layout_height:I

    const/16 v2, 0x15

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_visibility:I

    const/16 v2, 0x16

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_alpha:I

    const/16 v2, 0x2b

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_elevation:I

    const/16 v2, 0x2c

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_rotationX:I

    const/16 v2, 0x2d

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_rotationY:I

    const/16 v2, 0x2e

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_rotation:I

    const/16 v2, 0x3c

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_scaleX:I

    const/16 v2, 0x2f

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_scaleY:I

    const/16 v2, 0x30

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_transformPivotX:I

    const/16 v2, 0x31

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_transformPivotY:I

    const/16 v2, 0x32

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_translationX:I

    const/16 v2, 0x33

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_translationY:I

    const/16 v2, 0x34

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_translationZ:I

    const/16 v2, 0x35

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintWidth_default:I

    const/16 v2, 0x36

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintHeight_default:I

    const/16 v2, 0x37

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintWidth_max:I

    const/16 v2, 0x38

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintHeight_max:I

    const/16 v2, 0x39

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintWidth_min:I

    const/16 v2, 0x3a

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintHeight_min:I

    const/16 v2, 0x3b

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintCircle:I

    const/16 v2, 0x3d

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintCircleRadius:I

    const/16 v2, 0x3e

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintCircleAngle:I

    const/16 v2, 0x3f

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_android_id:I

    const/16 v2, 0x26

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintWidth_percent:I

    const/16 v2, 0x45

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_layout_constraintHeight_percent:I

    const/16 v2, 0x46

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_chainUseRtl:I

    const/16 v2, 0x47

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_barrierDirection:I

    const/16 v2, 0x48

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_constraint_referenced_ids:I

    const/16 v2, 0x49

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    sget-object v0, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    sget v1, Landroidx/constraintlayout/widget/i;->ConstraintSet_barrierAllowsGoneWidgets:I

    const/16 v2, 0x4a

    invoke-virtual {v0, v1, v2}, Landroid/util/SparseIntArray;->append(II)V

    return-void

    :array_0
    .array-data 4
        0x0
        0x4
        0x8
    .end array-data
.end method

.method public constructor <init>()V
    .locals 1

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    new-instance v0, Ljava/util/HashMap;

    invoke-direct {v0}, Ljava/util/HashMap;-><init>()V

    iput-object v0, p0, Landroidx/constraintlayout/widget/d;->c:Ljava/util/HashMap;

    return-void
.end method

.method private static a(Landroid/content/res/TypedArray;II)I
    .locals 1

    invoke-virtual {p0, p1, p2}, Landroid/content/res/TypedArray;->getResourceId(II)I

    move-result p2

    const/4 v0, -0x1

    if-ne p2, v0, :cond_0

    invoke-virtual {p0, p1, v0}, Landroid/content/res/TypedArray;->getInt(II)I

    move-result p2

    :cond_0
    return p2
.end method

.method private a(Landroid/content/Context;Landroid/util/AttributeSet;)Landroidx/constraintlayout/widget/d$a;
    .locals 2

    new-instance v0, Landroidx/constraintlayout/widget/d$a;

    const/4 v1, 0x0

    invoke-direct {v0, v1}, Landroidx/constraintlayout/widget/d$a;-><init>(Landroidx/constraintlayout/widget/c;)V

    sget-object v1, Landroidx/constraintlayout/widget/i;->ConstraintSet:[I

    invoke-virtual {p1, p2, v1}, Landroid/content/Context;->obtainStyledAttributes(Landroid/util/AttributeSet;[I)Landroid/content/res/TypedArray;

    move-result-object p1

    invoke-direct {p0, v0, p1}, Landroidx/constraintlayout/widget/d;->a(Landroidx/constraintlayout/widget/d$a;Landroid/content/res/TypedArray;)V

    invoke-virtual {p1}, Landroid/content/res/TypedArray;->recycle()V

    return-object v0
.end method

.method private a(Landroidx/constraintlayout/widget/d$a;Landroid/content/res/TypedArray;)V
    .locals 7

    invoke-virtual {p2}, Landroid/content/res/TypedArray;->getIndexCount()I

    move-result v0

    const/4 v1, 0x0

    :goto_0
    if-ge v1, v0, :cond_0

    invoke-virtual {p2, v1}, Landroid/content/res/TypedArray;->getIndex(I)I

    move-result v2

    sget-object v3, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    invoke-virtual {v3, v2}, Landroid/util/SparseIntArray;->get(I)I

    move-result v3

    packed-switch v3, :pswitch_data_0

    packed-switch v3, :pswitch_data_1

    const/high16 v4, 0x3f800000    # 1.0f

    const-string v5, "   "

    const-string v6, "ConstraintSet"

    packed-switch v3, :pswitch_data_2

    new-instance v3, Ljava/lang/StringBuilder;

    invoke-direct {v3}, Ljava/lang/StringBuilder;-><init>()V

    const-string v4, "Unknown attribute 0x"

    :goto_1
    invoke-virtual {v3, v4}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-static {v2}, Ljava/lang/Integer;->toHexString(I)Ljava/lang/String;

    move-result-object v4

    invoke-virtual {v3, v4}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v3, v5}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    sget-object v4, Landroidx/constraintlayout/widget/d;->b:Landroid/util/SparseIntArray;

    invoke-virtual {v4, v2}, Landroid/util/SparseIntArray;->get(I)I

    move-result v2

    invoke-virtual {v3, v2}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    invoke-virtual {v3}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v2

    invoke-static {v6, v2}, Landroid/util/Log;->w(Ljava/lang/String;Ljava/lang/String;)I

    goto/16 :goto_2

    :pswitch_0
    new-instance v3, Ljava/lang/StringBuilder;

    invoke-direct {v3}, Ljava/lang/StringBuilder;-><init>()V

    const-string v4, "unused attribute 0x"

    goto :goto_1

    :pswitch_1
    iget-boolean v3, p1, Landroidx/constraintlayout/widget/d$a;->ra:Z

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getBoolean(IZ)Z

    move-result v2

    iput-boolean v2, p1, Landroidx/constraintlayout/widget/d$a;->ra:Z

    goto/16 :goto_2

    :pswitch_2
    invoke-virtual {p2, v2}, Landroid/content/res/TypedArray;->getString(I)Ljava/lang/String;

    move-result-object v2

    iput-object v2, p1, Landroidx/constraintlayout/widget/d$a;->va:Ljava/lang/String;

    goto/16 :goto_2

    :pswitch_3
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->sa:I

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getInt(II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->sa:I

    goto/16 :goto_2

    :pswitch_4
    const-string v2, "CURRENTLY UNSUPPORTED"

    invoke-static {v6, v2}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;)I

    goto/16 :goto_2

    :pswitch_5
    invoke-virtual {p2, v2, v4}, Landroid/content/res/TypedArray;->getFloat(IF)F

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->qa:F

    goto/16 :goto_2

    :pswitch_6
    invoke-virtual {p2, v2, v4}, Landroid/content/res/TypedArray;->getFloat(IF)F

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->pa:F

    goto/16 :goto_2

    :pswitch_7
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->z:F

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getFloat(IF)F

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->z:F

    goto/16 :goto_2

    :pswitch_8
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->y:I

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getDimensionPixelSize(II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->y:I

    goto/16 :goto_2

    :pswitch_9
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->x:I

    invoke-static {p2, v2, v3}, Landroidx/constraintlayout/widget/d;->a(Landroid/content/res/TypedArray;II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->x:I

    goto/16 :goto_2

    :pswitch_a
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->X:F

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getFloat(IF)F

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->X:F

    goto/16 :goto_2

    :pswitch_b
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->ga:F

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getDimension(IF)F

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->ga:F

    goto/16 :goto_2

    :pswitch_c
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->fa:F

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getDimension(IF)F

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->fa:F

    goto/16 :goto_2

    :pswitch_d
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->ea:F

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getDimension(IF)F

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->ea:F

    goto/16 :goto_2

    :pswitch_e
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->da:F

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getFloat(IF)F

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->da:F

    goto/16 :goto_2

    :pswitch_f
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->ca:F

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getFloat(IF)F

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->ca:F

    goto/16 :goto_2

    :pswitch_10
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->ba:F

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getFloat(IF)F

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->ba:F

    goto/16 :goto_2

    :pswitch_11
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->aa:F

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getFloat(IF)F

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->aa:F

    goto/16 :goto_2

    :pswitch_12
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->Z:F

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getFloat(IF)F

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->Z:F

    goto/16 :goto_2

    :pswitch_13
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->Y:F

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getFloat(IF)F

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->Y:F

    goto/16 :goto_2

    :pswitch_14
    const/4 v3, 0x1

    iput-boolean v3, p1, Landroidx/constraintlayout/widget/d$a;->V:Z

    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->W:F

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getDimension(IF)F

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->W:F

    goto/16 :goto_2

    :pswitch_15
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->U:F

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getFloat(IF)F

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->U:F

    goto/16 :goto_2

    :pswitch_16
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->T:I

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getInt(II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->T:I

    goto/16 :goto_2

    :pswitch_17
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->S:I

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getInt(II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->S:I

    goto/16 :goto_2

    :pswitch_18
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->Q:F

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getFloat(IF)F

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->Q:F

    goto/16 :goto_2

    :pswitch_19
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->R:F

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getFloat(IF)F

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->R:F

    goto/16 :goto_2

    :pswitch_1a
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->d:I

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getResourceId(II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->d:I

    goto/16 :goto_2

    :pswitch_1b
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->v:F

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getFloat(IF)F

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->v:F

    goto/16 :goto_2

    :pswitch_1c
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->l:I

    invoke-static {p2, v2, v3}, Landroidx/constraintlayout/widget/d;->a(Landroid/content/res/TypedArray;II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->l:I

    goto/16 :goto_2

    :pswitch_1d
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->m:I

    invoke-static {p2, v2, v3}, Landroidx/constraintlayout/widget/d;->a(Landroid/content/res/TypedArray;II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->m:I

    goto/16 :goto_2

    :pswitch_1e
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->F:I

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getDimensionPixelSize(II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->F:I

    goto/16 :goto_2

    :pswitch_1f
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->r:I

    invoke-static {p2, v2, v3}, Landroidx/constraintlayout/widget/d;->a(Landroid/content/res/TypedArray;II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->r:I

    goto/16 :goto_2

    :pswitch_20
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->q:I

    invoke-static {p2, v2, v3}, Landroidx/constraintlayout/widget/d;->a(Landroid/content/res/TypedArray;II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->q:I

    goto/16 :goto_2

    :pswitch_21
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->I:I

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getDimensionPixelSize(II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->I:I

    goto/16 :goto_2

    :pswitch_22
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->k:I

    invoke-static {p2, v2, v3}, Landroidx/constraintlayout/widget/d;->a(Landroid/content/res/TypedArray;II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->k:I

    goto/16 :goto_2

    :pswitch_23
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->j:I

    invoke-static {p2, v2, v3}, Landroidx/constraintlayout/widget/d;->a(Landroid/content/res/TypedArray;II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->j:I

    goto/16 :goto_2

    :pswitch_24
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->E:I

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getDimensionPixelSize(II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->E:I

    goto/16 :goto_2

    :pswitch_25
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->C:I

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getInt(II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->C:I

    goto/16 :goto_2

    :pswitch_26
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->i:I

    invoke-static {p2, v2, v3}, Landroidx/constraintlayout/widget/d;->a(Landroid/content/res/TypedArray;II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->i:I

    goto/16 :goto_2

    :pswitch_27
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->h:I

    invoke-static {p2, v2, v3}, Landroidx/constraintlayout/widget/d;->a(Landroid/content/res/TypedArray;II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->h:I

    goto/16 :goto_2

    :pswitch_28
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->D:I

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getDimensionPixelSize(II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->D:I

    goto/16 :goto_2

    :pswitch_29
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->b:I

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getLayoutDimension(II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->b:I

    goto/16 :goto_2

    :pswitch_2a
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->J:I

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getInt(II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->J:I

    sget-object v2, Landroidx/constraintlayout/widget/d;->a:[I

    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->J:I

    aget v2, v2, v3

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->J:I

    goto/16 :goto_2

    :pswitch_2b
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->c:I

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getLayoutDimension(II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->c:I

    goto/16 :goto_2

    :pswitch_2c
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->u:F

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getFloat(IF)F

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->u:F

    goto/16 :goto_2

    :pswitch_2d
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->g:F

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getFloat(IF)F

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->g:F

    goto/16 :goto_2

    :pswitch_2e
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->f:I

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getDimensionPixelOffset(II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->f:I

    goto/16 :goto_2

    :pswitch_2f
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->e:I

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getDimensionPixelOffset(II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->e:I

    goto/16 :goto_2

    :pswitch_30
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->L:I

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getDimensionPixelSize(II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->L:I

    goto/16 :goto_2

    :pswitch_31
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->P:I

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getDimensionPixelSize(II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->P:I

    goto/16 :goto_2

    :pswitch_32
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->M:I

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getDimensionPixelSize(II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->M:I

    goto/16 :goto_2

    :pswitch_33
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->K:I

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getDimensionPixelSize(II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->K:I

    goto/16 :goto_2

    :pswitch_34
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->O:I

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getDimensionPixelSize(II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->O:I

    goto :goto_2

    :pswitch_35
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->N:I

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getDimensionPixelSize(II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->N:I

    goto :goto_2

    :pswitch_36
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->s:I

    invoke-static {p2, v2, v3}, Landroidx/constraintlayout/widget/d;->a(Landroid/content/res/TypedArray;II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->s:I

    goto :goto_2

    :pswitch_37
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->t:I

    invoke-static {p2, v2, v3}, Landroidx/constraintlayout/widget/d;->a(Landroid/content/res/TypedArray;II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->t:I

    goto :goto_2

    :pswitch_38
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->H:I

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getDimensionPixelSize(II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->H:I

    goto :goto_2

    :pswitch_39
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->B:I

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getDimensionPixelOffset(II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->B:I

    goto :goto_2

    :pswitch_3a
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->A:I

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getDimensionPixelOffset(II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->A:I

    goto :goto_2

    :pswitch_3b
    invoke-virtual {p2, v2}, Landroid/content/res/TypedArray;->getString(I)Ljava/lang/String;

    move-result-object v2

    iput-object v2, p1, Landroidx/constraintlayout/widget/d$a;->w:Ljava/lang/String;

    goto :goto_2

    :pswitch_3c
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->n:I

    invoke-static {p2, v2, v3}, Landroidx/constraintlayout/widget/d;->a(Landroid/content/res/TypedArray;II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->n:I

    goto :goto_2

    :pswitch_3d
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->o:I

    invoke-static {p2, v2, v3}, Landroidx/constraintlayout/widget/d;->a(Landroid/content/res/TypedArray;II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->o:I

    goto :goto_2

    :pswitch_3e
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->G:I

    invoke-virtual {p2, v2, v3}, Landroid/content/res/TypedArray;->getDimensionPixelSize(II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->G:I

    goto :goto_2

    :pswitch_3f
    iget v3, p1, Landroidx/constraintlayout/widget/d$a;->p:I

    invoke-static {p2, v2, v3}, Landroidx/constraintlayout/widget/d;->a(Landroid/content/res/TypedArray;II)I

    move-result v2

    iput v2, p1, Landroidx/constraintlayout/widget/d$a;->p:I

    :goto_2
    add-int/lit8 v1, v1, 0x1

    goto/16 :goto_0

    :cond_0
    return-void

    :pswitch_data_0
    .packed-switch 0x1
        :pswitch_3f
        :pswitch_3e
        :pswitch_3d
        :pswitch_3c
        :pswitch_3b
        :pswitch_3a
        :pswitch_39
        :pswitch_38
        :pswitch_37
        :pswitch_36
        :pswitch_35
        :pswitch_34
        :pswitch_33
        :pswitch_32
        :pswitch_31
        :pswitch_30
        :pswitch_2f
        :pswitch_2e
        :pswitch_2d
        :pswitch_2c
        :pswitch_2b
        :pswitch_2a
        :pswitch_29
        :pswitch_28
        :pswitch_27
        :pswitch_26
        :pswitch_25
        :pswitch_24
        :pswitch_23
        :pswitch_22
        :pswitch_21
        :pswitch_20
        :pswitch_1f
        :pswitch_1e
        :pswitch_1d
        :pswitch_1c
        :pswitch_1b
        :pswitch_1a
        :pswitch_19
        :pswitch_18
        :pswitch_17
        :pswitch_16
        :pswitch_15
        :pswitch_14
        :pswitch_13
        :pswitch_12
        :pswitch_11
        :pswitch_10
        :pswitch_f
        :pswitch_e
        :pswitch_d
        :pswitch_c
        :pswitch_b
    .end packed-switch

    :pswitch_data_1
    .packed-switch 0x3c
        :pswitch_a
        :pswitch_9
        :pswitch_8
        :pswitch_7
    .end packed-switch

    :pswitch_data_2
    .packed-switch 0x45
        :pswitch_6
        :pswitch_5
        :pswitch_4
        :pswitch_3
        :pswitch_2
        :pswitch_1
        :pswitch_0
    .end packed-switch
.end method

.method private a(Landroid/view/View;Ljava/lang/String;)[I
    .locals 9

    const-string v0, ","

    invoke-virtual {p2, v0}, Ljava/lang/String;->split(Ljava/lang/String;)[Ljava/lang/String;

    move-result-object p2

    invoke-virtual {p1}, Landroid/view/View;->getContext()Landroid/content/Context;

    move-result-object v0

    array-length v1, p2

    new-array v1, v1, [I

    const/4 v2, 0x0

    move v3, v2

    move v4, v3

    :goto_0
    array-length v5, p2

    if-ge v3, v5, :cond_2

    aget-object v5, p2, v3

    invoke-virtual {v5}, Ljava/lang/String;->trim()Ljava/lang/String;

    move-result-object v5

    :try_start_0
    const-class v6, Landroidx/constraintlayout/widget/h;

    invoke-virtual {v6, v5}, Ljava/lang/Class;->getField(Ljava/lang/String;)Ljava/lang/reflect/Field;

    move-result-object v6

    const/4 v7, 0x0

    invoke-virtual {v6, v7}, Ljava/lang/reflect/Field;->getInt(Ljava/lang/Object;)I

    move-result v6
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    goto :goto_1

    :catch_0
    move v6, v2

    :goto_1
    if-nez v6, :cond_0

    invoke-virtual {v0}, Landroid/content/Context;->getResources()Landroid/content/res/Resources;

    move-result-object v6

    invoke-virtual {v0}, Landroid/content/Context;->getPackageName()Ljava/lang/String;

    move-result-object v7

    const-string v8, "id"

    invoke-virtual {v6, v5, v8, v7}, Landroid/content/res/Resources;->getIdentifier(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)I

    move-result v6

    :cond_0
    if-nez v6, :cond_1

    invoke-virtual {p1}, Landroid/view/View;->isInEditMode()Z

    move-result v7

    if-eqz v7, :cond_1

    invoke-virtual {p1}, Landroid/view/View;->getParent()Landroid/view/ViewParent;

    move-result-object v7

    instance-of v7, v7, Landroidx/constraintlayout/widget/ConstraintLayout;

    if-eqz v7, :cond_1

    invoke-virtual {p1}, Landroid/view/View;->getParent()Landroid/view/ViewParent;

    move-result-object v7

    check-cast v7, Landroidx/constraintlayout/widget/ConstraintLayout;

    invoke-virtual {v7, v2, v5}, Landroidx/constraintlayout/widget/ConstraintLayout;->a(ILjava/lang/Object;)Ljava/lang/Object;

    move-result-object v5

    if-eqz v5, :cond_1

    instance-of v7, v5, Ljava/lang/Integer;

    if-eqz v7, :cond_1

    check-cast v5, Ljava/lang/Integer;

    invoke-virtual {v5}, Ljava/lang/Integer;->intValue()I

    move-result v6

    :cond_1
    add-int/lit8 v5, v4, 0x1

    aput v6, v1, v4

    add-int/lit8 v3, v3, 0x1

    move v4, v5

    goto :goto_0

    :cond_2
    array-length p1, p2

    if-eq v4, p1, :cond_3

    invoke-static {v1, v4}, Ljava/util/Arrays;->copyOf([II)[I

    move-result-object v1

    :cond_3
    return-object v1
.end method


# virtual methods
.method public a(Landroid/content/Context;I)V
    .locals 4

    invoke-virtual {p1}, Landroid/content/Context;->getResources()Landroid/content/res/Resources;

    move-result-object v0

    invoke-virtual {v0, p2}, Landroid/content/res/Resources;->getXml(I)Landroid/content/res/XmlResourceParser;

    move-result-object p2

    :try_start_0
    invoke-interface {p2}, Lorg/xmlpull/v1/XmlPullParser;->getEventType()I

    move-result v0

    :goto_0
    const/4 v1, 0x1

    if-eq v0, v1, :cond_3

    if-eqz v0, :cond_2

    const/4 v2, 0x2

    if-eq v0, v2, :cond_0

    const/4 v1, 0x3

    goto :goto_1

    :cond_0
    invoke-interface {p2}, Lorg/xmlpull/v1/XmlPullParser;->getName()Ljava/lang/String;

    move-result-object v0

    invoke-static {p2}, Landroid/util/Xml;->asAttributeSet(Lorg/xmlpull/v1/XmlPullParser;)Landroid/util/AttributeSet;

    move-result-object v2

    invoke-direct {p0, p1, v2}, Landroidx/constraintlayout/widget/d;->a(Landroid/content/Context;Landroid/util/AttributeSet;)Landroidx/constraintlayout/widget/d$a;

    move-result-object v2

    const-string v3, "Guideline"

    invoke-virtual {v0, v3}, Ljava/lang/String;->equalsIgnoreCase(Ljava/lang/String;)Z

    move-result v0

    if-eqz v0, :cond_1

    iput-boolean v1, v2, Landroidx/constraintlayout/widget/d$a;->a:Z

    :cond_1
    iget-object v0, p0, Landroidx/constraintlayout/widget/d;->c:Ljava/util/HashMap;

    iget v1, v2, Landroidx/constraintlayout/widget/d$a;->d:I

    invoke-static {v1}, Ljava/lang/Integer;->valueOf(I)Ljava/lang/Integer;

    move-result-object v1

    invoke-virtual {v0, v1, v2}, Ljava/util/HashMap;->put(Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;

    goto :goto_1

    :cond_2
    invoke-interface {p2}, Lorg/xmlpull/v1/XmlPullParser;->getName()Ljava/lang/String;

    :goto_1
    invoke-interface {p2}, Lorg/xmlpull/v1/XmlPullParser;->next()I

    move-result v0
    :try_end_0
    .catch Lorg/xmlpull/v1/XmlPullParserException; {:try_start_0 .. :try_end_0} :catch_1
    .catch Ljava/io/IOException; {:try_start_0 .. :try_end_0} :catch_0

    goto :goto_0

    :catch_0
    move-exception p1

    invoke-virtual {p1}, Ljava/io/IOException;->printStackTrace()V

    goto :goto_2

    :catch_1
    move-exception p1

    invoke-virtual {p1}, Lorg/xmlpull/v1/XmlPullParserException;->printStackTrace()V

    :cond_3
    :goto_2
    return-void
.end method

.method a(Landroidx/constraintlayout/widget/ConstraintLayout;)V
    .locals 9

    invoke-virtual {p1}, Landroid/view/ViewGroup;->getChildCount()I

    move-result v0

    new-instance v1, Ljava/util/HashSet;

    iget-object v2, p0, Landroidx/constraintlayout/widget/d;->c:Ljava/util/HashMap;

    invoke-virtual {v2}, Ljava/util/HashMap;->keySet()Ljava/util/Set;

    move-result-object v2

    invoke-direct {v1, v2}, Ljava/util/HashSet;-><init>(Ljava/util/Collection;)V

    const/4 v2, 0x0

    :goto_0
    const/4 v3, -0x1

    const/4 v4, 0x1

    if-ge v2, v0, :cond_8

    invoke-virtual {p1, v2}, Landroid/view/ViewGroup;->getChildAt(I)Landroid/view/View;

    move-result-object v5

    invoke-virtual {v5}, Landroid/view/View;->getId()I

    move-result v6

    if-eq v6, v3, :cond_7

    iget-object v7, p0, Landroidx/constraintlayout/widget/d;->c:Ljava/util/HashMap;

    invoke-static {v6}, Ljava/lang/Integer;->valueOf(I)Ljava/lang/Integer;

    move-result-object v8

    invoke-virtual {v7, v8}, Ljava/util/HashMap;->containsKey(Ljava/lang/Object;)Z

    move-result v7

    if-eqz v7, :cond_6

    invoke-static {v6}, Ljava/lang/Integer;->valueOf(I)Ljava/lang/Integer;

    move-result-object v7

    invoke-virtual {v1, v7}, Ljava/util/HashSet;->remove(Ljava/lang/Object;)Z

    iget-object v7, p0, Landroidx/constraintlayout/widget/d;->c:Ljava/util/HashMap;

    invoke-static {v6}, Ljava/lang/Integer;->valueOf(I)Ljava/lang/Integer;

    move-result-object v8

    invoke-virtual {v7, v8}, Ljava/util/HashMap;->get(Ljava/lang/Object;)Ljava/lang/Object;

    move-result-object v7

    check-cast v7, Landroidx/constraintlayout/widget/d$a;

    instance-of v8, v5, Landroidx/constraintlayout/widget/a;

    if-eqz v8, :cond_0

    iput v4, v7, Landroidx/constraintlayout/widget/d$a;->ta:I

    :cond_0
    iget v8, v7, Landroidx/constraintlayout/widget/d$a;->ta:I

    if-eq v8, v3, :cond_3

    if-eq v8, v4, :cond_1

    goto :goto_1

    :cond_1
    move-object v3, v5

    check-cast v3, Landroidx/constraintlayout/widget/a;

    invoke-virtual {v3, v6}, Landroid/view/View;->setId(I)V

    iget v4, v7, Landroidx/constraintlayout/widget/d$a;->sa:I

    invoke-virtual {v3, v4}, Landroidx/constraintlayout/widget/a;->setType(I)V

    iget-boolean v4, v7, Landroidx/constraintlayout/widget/d$a;->ra:Z

    invoke-virtual {v3, v4}, Landroidx/constraintlayout/widget/a;->setAllowsGoneWidget(Z)V

    iget-object v4, v7, Landroidx/constraintlayout/widget/d$a;->ua:[I

    if-eqz v4, :cond_2

    invoke-virtual {v3, v4}, Landroidx/constraintlayout/widget/b;->setReferencedIds([I)V

    goto :goto_1

    :cond_2
    iget-object v4, v7, Landroidx/constraintlayout/widget/d$a;->va:Ljava/lang/String;

    if-eqz v4, :cond_3

    invoke-direct {p0, v3, v4}, Landroidx/constraintlayout/widget/d;->a(Landroid/view/View;Ljava/lang/String;)[I

    move-result-object v4

    iput-object v4, v7, Landroidx/constraintlayout/widget/d$a;->ua:[I

    iget-object v4, v7, Landroidx/constraintlayout/widget/d$a;->ua:[I

    invoke-virtual {v3, v4}, Landroidx/constraintlayout/widget/b;->setReferencedIds([I)V

    :cond_3
    :goto_1
    invoke-virtual {v5}, Landroid/view/View;->getLayoutParams()Landroid/view/ViewGroup$LayoutParams;

    move-result-object v3

    check-cast v3, Landroidx/constraintlayout/widget/ConstraintLayout$a;

    invoke-virtual {v7, v3}, Landroidx/constraintlayout/widget/d$a;->a(Landroidx/constraintlayout/widget/ConstraintLayout$a;)V

    invoke-virtual {v5, v3}, Landroid/view/View;->setLayoutParams(Landroid/view/ViewGroup$LayoutParams;)V

    iget v3, v7, Landroidx/constraintlayout/widget/d$a;->J:I

    invoke-virtual {v5, v3}, Landroid/view/View;->setVisibility(I)V

    sget v3, Landroid/os/Build$VERSION;->SDK_INT:I

    const/16 v4, 0x11

    if-lt v3, v4, :cond_6

    iget v3, v7, Landroidx/constraintlayout/widget/d$a;->U:F

    invoke-virtual {v5, v3}, Landroid/view/View;->setAlpha(F)V

    iget v3, v7, Landroidx/constraintlayout/widget/d$a;->X:F

    invoke-virtual {v5, v3}, Landroid/view/View;->setRotation(F)V

    iget v3, v7, Landroidx/constraintlayout/widget/d$a;->Y:F

    invoke-virtual {v5, v3}, Landroid/view/View;->setRotationX(F)V

    iget v3, v7, Landroidx/constraintlayout/widget/d$a;->Z:F

    invoke-virtual {v5, v3}, Landroid/view/View;->setRotationY(F)V

    iget v3, v7, Landroidx/constraintlayout/widget/d$a;->aa:F

    invoke-virtual {v5, v3}, Landroid/view/View;->setScaleX(F)V

    iget v3, v7, Landroidx/constraintlayout/widget/d$a;->ba:F

    invoke-virtual {v5, v3}, Landroid/view/View;->setScaleY(F)V

    iget v3, v7, Landroidx/constraintlayout/widget/d$a;->ca:F

    invoke-static {v3}, Ljava/lang/Float;->isNaN(F)Z

    move-result v3

    if-nez v3, :cond_4

    iget v3, v7, Landroidx/constraintlayout/widget/d$a;->ca:F

    invoke-virtual {v5, v3}, Landroid/view/View;->setPivotX(F)V

    :cond_4
    iget v3, v7, Landroidx/constraintlayout/widget/d$a;->da:F

    invoke-static {v3}, Ljava/lang/Float;->isNaN(F)Z

    move-result v3

    if-nez v3, :cond_5

    iget v3, v7, Landroidx/constraintlayout/widget/d$a;->da:F

    invoke-virtual {v5, v3}, Landroid/view/View;->setPivotY(F)V

    :cond_5
    iget v3, v7, Landroidx/constraintlayout/widget/d$a;->ea:F

    invoke-virtual {v5, v3}, Landroid/view/View;->setTranslationX(F)V

    iget v3, v7, Landroidx/constraintlayout/widget/d$a;->fa:F

    invoke-virtual {v5, v3}, Landroid/view/View;->setTranslationY(F)V

    sget v3, Landroid/os/Build$VERSION;->SDK_INT:I

    const/16 v4, 0x15

    if-lt v3, v4, :cond_6

    iget v3, v7, Landroidx/constraintlayout/widget/d$a;->ga:F

    invoke-virtual {v5, v3}, Landroid/view/View;->setTranslationZ(F)V

    iget-boolean v3, v7, Landroidx/constraintlayout/widget/d$a;->V:Z

    if-eqz v3, :cond_6

    iget v3, v7, Landroidx/constraintlayout/widget/d$a;->W:F

    invoke-virtual {v5, v3}, Landroid/view/View;->setElevation(F)V

    :cond_6
    add-int/lit8 v2, v2, 0x1

    goto/16 :goto_0

    :cond_7
    new-instance p1, Ljava/lang/RuntimeException;

    const-string v0, "All children of ConstraintLayout must have ids to use ConstraintSet"

    invoke-direct {p1, v0}, Ljava/lang/RuntimeException;-><init>(Ljava/lang/String;)V

    throw p1

    :cond_8
    invoke-virtual {v1}, Ljava/util/HashSet;->iterator()Ljava/util/Iterator;

    move-result-object v0

    :cond_9
    :goto_2
    invoke-interface {v0}, Ljava/util/Iterator;->hasNext()Z

    move-result v1

    if-eqz v1, :cond_e

    invoke-interface {v0}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v1

    check-cast v1, Ljava/lang/Integer;

    iget-object v2, p0, Landroidx/constraintlayout/widget/d;->c:Ljava/util/HashMap;

    invoke-virtual {v2, v1}, Ljava/util/HashMap;->get(Ljava/lang/Object;)Ljava/lang/Object;

    move-result-object v2

    check-cast v2, Landroidx/constraintlayout/widget/d$a;

    iget v5, v2, Landroidx/constraintlayout/widget/d$a;->ta:I

    if-eq v5, v3, :cond_d

    if-eq v5, v4, :cond_a

    goto :goto_4

    :cond_a
    new-instance v5, Landroidx/constraintlayout/widget/a;

    invoke-virtual {p1}, Landroid/view/ViewGroup;->getContext()Landroid/content/Context;

    move-result-object v6

    invoke-direct {v5, v6}, Landroidx/constraintlayout/widget/a;-><init>(Landroid/content/Context;)V

    invoke-virtual {v1}, Ljava/lang/Integer;->intValue()I

    move-result v6

    invoke-virtual {v5, v6}, Landroid/view/View;->setId(I)V

    iget-object v6, v2, Landroidx/constraintlayout/widget/d$a;->ua:[I

    if-eqz v6, :cond_b

    invoke-virtual {v5, v6}, Landroidx/constraintlayout/widget/b;->setReferencedIds([I)V

    goto :goto_3

    :cond_b
    iget-object v6, v2, Landroidx/constraintlayout/widget/d$a;->va:Ljava/lang/String;

    if-eqz v6, :cond_c

    invoke-direct {p0, v5, v6}, Landroidx/constraintlayout/widget/d;->a(Landroid/view/View;Ljava/lang/String;)[I

    move-result-object v6

    iput-object v6, v2, Landroidx/constraintlayout/widget/d$a;->ua:[I

    iget-object v6, v2, Landroidx/constraintlayout/widget/d$a;->ua:[I

    invoke-virtual {v5, v6}, Landroidx/constraintlayout/widget/b;->setReferencedIds([I)V

    :cond_c
    :goto_3
    iget v6, v2, Landroidx/constraintlayout/widget/d$a;->sa:I

    invoke-virtual {v5, v6}, Landroidx/constraintlayout/widget/a;->setType(I)V

    invoke-virtual {p1}, Landroidx/constraintlayout/widget/ConstraintLayout;->generateDefaultLayoutParams()Landroidx/constraintlayout/widget/ConstraintLayout$a;

    move-result-object v6

    invoke-virtual {v5}, Landroidx/constraintlayout/widget/b;->a()V

    invoke-virtual {v2, v6}, Landroidx/constraintlayout/widget/d$a;->a(Landroidx/constraintlayout/widget/ConstraintLayout$a;)V

    invoke-virtual {p1, v5, v6}, Landroid/view/ViewGroup;->addView(Landroid/view/View;Landroid/view/ViewGroup$LayoutParams;)V

    :cond_d
    :goto_4
    iget-boolean v5, v2, Landroidx/constraintlayout/widget/d$a;->a:Z

    if-eqz v5, :cond_9

    new-instance v5, Landroidx/constraintlayout/widget/f;

    invoke-virtual {p1}, Landroid/view/ViewGroup;->getContext()Landroid/content/Context;

    move-result-object v6

    invoke-direct {v5, v6}, Landroidx/constraintlayout/widget/f;-><init>(Landroid/content/Context;)V

    invoke-virtual {v1}, Ljava/lang/Integer;->intValue()I

    move-result v1

    invoke-virtual {v5, v1}, Landroid/view/View;->setId(I)V

    invoke-virtual {p1}, Landroidx/constraintlayout/widget/ConstraintLayout;->generateDefaultLayoutParams()Landroidx/constraintlayout/widget/ConstraintLayout$a;

    move-result-object v1

    invoke-virtual {v2, v1}, Landroidx/constraintlayout/widget/d$a;->a(Landroidx/constraintlayout/widget/ConstraintLayout$a;)V

    invoke-virtual {p1, v5, v1}, Landroid/view/ViewGroup;->addView(Landroid/view/View;Landroid/view/ViewGroup$LayoutParams;)V

    goto :goto_2

    :cond_e
    return-void
.end method

.method public a(Landroidx/constraintlayout/widget/e;)V
    .locals 9

    invoke-virtual {p1}, Landroid/view/ViewGroup;->getChildCount()I

    move-result v0

    iget-object v1, p0, Landroidx/constraintlayout/widget/d;->c:Ljava/util/HashMap;

    invoke-virtual {v1}, Ljava/util/HashMap;->clear()V

    const/4 v1, 0x0

    :goto_0
    if-ge v1, v0, :cond_3

    invoke-virtual {p1, v1}, Landroid/view/ViewGroup;->getChildAt(I)Landroid/view/View;

    move-result-object v2

    invoke-virtual {v2}, Landroid/view/View;->getLayoutParams()Landroid/view/ViewGroup$LayoutParams;

    move-result-object v3

    check-cast v3, Landroidx/constraintlayout/widget/e$a;

    invoke-virtual {v2}, Landroid/view/View;->getId()I

    move-result v4

    const/4 v5, -0x1

    if-eq v4, v5, :cond_2

    iget-object v5, p0, Landroidx/constraintlayout/widget/d;->c:Ljava/util/HashMap;

    invoke-static {v4}, Ljava/lang/Integer;->valueOf(I)Ljava/lang/Integer;

    move-result-object v6

    invoke-virtual {v5, v6}, Ljava/util/HashMap;->containsKey(Ljava/lang/Object;)Z

    move-result v5

    if-nez v5, :cond_0

    iget-object v5, p0, Landroidx/constraintlayout/widget/d;->c:Ljava/util/HashMap;

    invoke-static {v4}, Ljava/lang/Integer;->valueOf(I)Ljava/lang/Integer;

    move-result-object v6

    new-instance v7, Landroidx/constraintlayout/widget/d$a;

    const/4 v8, 0x0

    invoke-direct {v7, v8}, Landroidx/constraintlayout/widget/d$a;-><init>(Landroidx/constraintlayout/widget/c;)V

    invoke-virtual {v5, v6, v7}, Ljava/util/HashMap;->put(Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;

    :cond_0
    iget-object v5, p0, Landroidx/constraintlayout/widget/d;->c:Ljava/util/HashMap;

    invoke-static {v4}, Ljava/lang/Integer;->valueOf(I)Ljava/lang/Integer;

    move-result-object v6

    invoke-virtual {v5, v6}, Ljava/util/HashMap;->get(Ljava/lang/Object;)Ljava/lang/Object;

    move-result-object v5

    check-cast v5, Landroidx/constraintlayout/widget/d$a;

    instance-of v6, v2, Landroidx/constraintlayout/widget/b;

    if-eqz v6, :cond_1

    check-cast v2, Landroidx/constraintlayout/widget/b;

    invoke-static {v5, v2, v4, v3}, Landroidx/constraintlayout/widget/d$a;->a(Landroidx/constraintlayout/widget/d$a;Landroidx/constraintlayout/widget/b;ILandroidx/constraintlayout/widget/e$a;)V

    :cond_1
    invoke-static {v5, v4, v3}, Landroidx/constraintlayout/widget/d$a;->a(Landroidx/constraintlayout/widget/d$a;ILandroidx/constraintlayout/widget/e$a;)V

    add-int/lit8 v1, v1, 0x1

    goto :goto_0

    :cond_2
    new-instance p1, Ljava/lang/RuntimeException;

    const-string v0, "All children of ConstraintLayout must have ids to use ConstraintSet"

    invoke-direct {p1, v0}, Ljava/lang/RuntimeException;-><init>(Ljava/lang/String;)V

    throw p1

    :cond_3
    return-void
.end method

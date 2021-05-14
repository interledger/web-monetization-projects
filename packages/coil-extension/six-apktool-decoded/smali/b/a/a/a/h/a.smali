.class public Lb/a/a/a/h/a;
.super La/a/b/a/e;
.source ""


# static fields
.field static final b:D


# direct methods
.method static constructor <clinit>()V
    .locals 2

    const-wide v0, 0x4046800000000000L    # 45.0

    invoke-static {v0, v1}, Ljava/lang/Math;->toRadians(D)D

    move-result-wide v0

    invoke-static {v0, v1}, Ljava/lang/Math;->cos(D)D

    move-result-wide v0

    sput-wide v0, Lb/a/a/a/h/a;->b:D

    return-void
.end method

.method public static a(FFZ)F
    .locals 6

    if-eqz p2, :cond_0

    float-to-double v0, p0

    const-wide/high16 v2, 0x3ff0000000000000L    # 1.0

    sget-wide v4, Lb/a/a/a/h/a;->b:D

    sub-double/2addr v2, v4

    float-to-double p0, p1

    mul-double/2addr v2, p0

    add-double/2addr v0, v2

    double-to-float p0, v0

    :cond_0
    return p0
.end method

.method public static b(FFZ)F
    .locals 6

    const/high16 v0, 0x3fc00000    # 1.5f

    if-eqz p2, :cond_0

    mul-float/2addr p0, v0

    float-to-double v0, p0

    const-wide/high16 v2, 0x3ff0000000000000L    # 1.0

    sget-wide v4, Lb/a/a/a/h/a;->b:D

    sub-double/2addr v2, v4

    float-to-double p0, p1

    mul-double/2addr v2, p0

    add-double/2addr v0, v2

    double-to-float p0, v0

    return p0

    :cond_0
    mul-float/2addr p0, v0

    return p0
.end method


# virtual methods
.method public final a(F)V
    .locals 0

    const p0, 0x0

    throw p0
.end method

.method public a(FF)V
    .locals 0

    const p0, 0x0

    throw p0
.end method

.method public b()F
    .locals 0

    const p0, 0x0

    throw p0
.end method

.method public b(F)V
    .locals 0

    const p0, 0x0

    throw p0
.end method

.method public getPadding(Landroid/graphics/Rect;)Z
    .locals 0

    const p0, 0x0

    throw p0
.end method

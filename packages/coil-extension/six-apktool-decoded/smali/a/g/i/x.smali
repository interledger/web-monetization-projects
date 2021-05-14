.class La/g/i/x;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements Landroid/animation/ValueAnimator$AnimatorUpdateListener;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = La/g/i/y;->a(La/g/i/B;)La/g/i/y;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:La/g/i/B;

.field final synthetic b:Landroid/view/View;

.field final synthetic c:La/g/i/y;


# direct methods
.method constructor <init>(La/g/i/y;La/g/i/B;Landroid/view/View;)V
    .locals 0

    iput-object p1, p0, La/g/i/x;->c:La/g/i/y;

    iput-object p2, p0, La/g/i/x;->a:La/g/i/B;

    iput-object p3, p0, La/g/i/x;->b:Landroid/view/View;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public onAnimationUpdate(Landroid/animation/ValueAnimator;)V
    .locals 1

    iget-object p1, p0, La/g/i/x;->a:La/g/i/B;

    iget-object v0, p0, La/g/i/x;->b:Landroid/view/View;

    invoke-interface {p1, v0}, La/g/i/B;->a(Landroid/view/View;)V

    return-void
.end method
